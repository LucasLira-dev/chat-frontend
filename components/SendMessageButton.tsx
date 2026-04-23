'use client';

import { useEffect, useRef, useState } from "react";

import { Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messagesService } from "@/services/messagesService";
import { toastError } from "./ui/sonner";
import { getSocket } from "@/lib/socket";

export const SendMessageButton = ({ conversationId }: { conversationId: string }) => {

    const [messageContent, setMessageContent] = useState("");
    const queryClient = useQueryClient();

    const socket = getSocket();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const typingRef = useRef(false);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            if (typingRef.current && socket.connected) {
                socket.emit('typing:update', {
                    conversationId,
                    isTyping: false,
                });
            }

            typingRef.current = false;
        };
    }, [conversationId, socket]);

    const sendMessageMutation = useMutation({
        mutationFn: async (content: string) => messagesService.sendMessage(content, conversationId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['myMessages', conversationId] });
            await queryClient.invalidateQueries({ queryKey: ['myConversations'] });
            console.log("Message sent successfully");
        },
        onError: (error) => {
            toastError({ title: "Erro", description: "Não foi possível enviar a mensagem. Tente novamente." });
            console.error("Error sending message:", error);
        }
    })

    const handleSendMessage = () => {
        if (!messageContent.trim()) {
            toastError({ title: "Erro", description: "Por favor, insira uma mensagem válida." });
            return;
        }

        try {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            } 

            if (typingRef.current) {
                if (socket.connected) {
                    socket.emit('typing:update', {
                        conversationId,
                        isTyping: false,
                    });
                }

                typingRef.current = false;
            }

            sendMessageMutation.mutate(messageContent);
            setMessageContent("");
        }
        catch (error) {
            console.error("Error sending message:", error);
            toastError({ title: "Erro", description: "Não foi possível enviar a mensagem. Tente novamente." });
        }
    }

    return (
        <div className="flex gap-2 border-t border-border bg-background p-4 transition-colors">
            <input 
                type="text" 
                className="flex-1 rounded-lg border border-border bg-muted/50 p-2 text-sm text-foreground placeholder:pl-2 placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]" 
                placeholder="Digite sua mensagem..." 
                value={messageContent}
                onChange={(e) => {
                    const nextValue = e.target.value;
                    setMessageContent(nextValue);

                    if (!nextValue.trim()) {
                        if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                            timeoutRef.current = null;
                        }

                        if (typingRef.current && socket.connected) {
                            socket.emit('typing:update', {
                                conversationId,
                                isTyping: false,
                            });
                        }

                        typingRef.current = false;
                        return;
                    }
                    
                    if (!typingRef.current && socket.connected) {
                        typingRef.current = true;
                        socket.emit('typing:update', {
                            conversationId,
                            isTyping: true,
                        });
                    }

                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }

                    timeoutRef.current = setTimeout(() => {
                        typingRef.current = false;

                        if (socket.connected) {
                            socket.emit('typing:update', {
                                conversationId,
                                isTyping: false,
                            });
                        }
                    }, 2000);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSendMessage();
                    }
                }}
            />
            <button 
                className="flex items-center justify-center rounded-lg bg-[#5A4BCF] p-2 text-white transition-colors hover:bg-[#4b3fc0] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
                onClick={handleSendMessage}
                disabled={messageContent.trim() === "" || sendMessageMutation.isPending}
            >
                <Send size={20} />
            </button>
        </div>
    )
}
