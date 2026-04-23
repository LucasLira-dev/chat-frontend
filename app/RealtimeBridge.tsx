'use client';

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { getExistingSocket, getSocket } from "@/lib/socket";
import { ConversationsResponse, Message, MessagesResponse } from "@/types";

type PresenceUpdateEvent = {
    userId: string;
    isOnline: boolean;
};

type MessageNewEvent = {
    messageId: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: string;
};

type TypingUpdateEvent = {
    conversationId: string;
    userId: string;
    isTyping: boolean;
}

export const RealtimeBridge = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const userId = user?.id;
    const previousUserIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (!userId) {
            const existingSocket = getExistingSocket();

            if (previousUserIdRef.current && existingSocket?.connected) {
                existingSocket.disconnect();
            }

            previousUserIdRef.current = null;
            return;
        }

        const socket = getSocket();

        if (previousUserIdRef.current && previousUserIdRef.current !== userId && socket.connected) {
            socket.disconnect();
        }

        previousUserIdRef.current = userId;

        const handlePresenceUpdate = ({ userId: changeUserId, isOnline }: PresenceUpdateEvent) => {
            queryClient.setQueryData<ConversationsResponse | undefined>(
                ['myConversations', userId],
                (current) =>
                    current?.map((conversation) =>
                        conversation.otherUserId === changeUserId
                            ? { ...conversation, isOnline }
                            : conversation
                    ),
            );
        };

        const handleMessageNew = (event: MessageNewEvent) => {
            const conversationsKey = ['myConversations', userId] as const;
            const currentConversations = queryClient.getQueryData<ConversationsResponse | undefined>(conversationsKey);
            const hasConversationInList = currentConversations?.some(
                (conversation) => conversation.conversationId === event.conversationId,
            ) ?? false;

            queryClient.setQueryData<MessagesResponse | undefined>(
                ['myMessages', event.conversationId],
                (current) => {
                    if (!current) return current;
                    if (current.some((msg) => msg.messageId === event.messageId)) return current;

                    const nextMessage: Message = {
                        messageId: event.messageId,
                        content: event.content,
                        itsme: event.senderId === userId,
                        readAt: null,
                        createdAt: event.createdAt,
                    };

                    const updatedCurrent = current.map((msg) => {
                        if (msg.itsme && msg.readAt === null && event.senderId !== userId) {
                            return { ...msg, readAt: new Date().toISOString() };
                        } 
                        return msg;
                    });

                    return [...updatedCurrent, nextMessage];
                },
            );

            if (event.senderId !== userId && !hasConversationInList) {
                void queryClient.invalidateQueries({ queryKey: conversationsKey });
                return;
            }

            queryClient.setQueryData<ConversationsResponse | undefined>(
            conversationsKey,
            (current) =>
                current?.map((conversation) => 
                    conversation.conversationId === event.conversationId
                        ? {
                            ...conversation,
                            lastMessage: {
                                content: event.content,
                                createdAt: event.createdAt,
                            }
                        } : conversation
                )
                .sort((a, b) => {
                    const aTime = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
                    const bTime = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
                    return bTime - aTime;
                }),
            );
        };

        const handleTypingUpdate = (event: TypingUpdateEvent) => {
            queryClient.setQueryData<ConversationsResponse | undefined>(
                ['myConversations', userId],
                (current) =>
                    current?.map((conversation) =>
                        conversation.conversationId === event.conversationId &&
                        conversation.otherUserId === event.userId 
                            ? { ...conversation, isTyping: event.isTyping }
                            : conversation
                    ),
            )
        }

        const handleConnect = () => {
            queryClient.invalidateQueries({ queryKey: ['myConversations', userId] });
        };

        socket.on('connect', handleConnect);
        socket.on('presence:update', handlePresenceUpdate);
        socket.on('message:new', handleMessageNew);
        socket.on('typing:update', handleTypingUpdate);

        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            socket.off('connect', handleConnect);
            socket.off('presence:update', handlePresenceUpdate);
            socket.off('message:new', handleMessageNew);
            socket.off('typing:update', handleTypingUpdate);
        };
    }, [queryClient, userId]);

    return null;
}
