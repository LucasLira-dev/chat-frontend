'use client';

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth-context";
import { getSocket } from "@/lib/socket";
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

export const RealtimeBridge = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const userId = user?.id;

    useEffect(() => {
        if (!userId) return;

        const socket = getSocket();

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

            queryClient.setQueryData<ConversationsResponse | undefined>(
            ['myConversations', userId],
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

        const handleConnect = () => {
            queryClient.invalidateQueries({ queryKey: ['myConversations', userId] });
        };

        socket.on('connect', handleConnect);
        socket.on('presence:update', handlePresenceUpdate);
        socket.on('message:new', handleMessageNew);

        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            socket.off('connect', handleConnect);
            socket.off('presence:update', handlePresenceUpdate);
            socket.off('message:new', handleMessageNew);
            socket.disconnect();
        };
    }, [queryClient, userId]);

    return null;
}