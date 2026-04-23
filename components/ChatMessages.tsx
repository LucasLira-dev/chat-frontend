'use client';

import { SendMessageButton } from "./SendMessageButton"
import { useMemo } from "react"
import { formatTime } from "@/lib/utils";
import { CheckCheck, Check } from "lucide-react";
import { ChatLoading } from "./ChatLoading";
import { useMessages } from "@/hooks/useMessages";

export const ChatMessages = ({ conversationId }: { conversationId: string }) => {

    const { messages: data, isLoading, isError } = useMessages(conversationId);

    const messages = useMemo(() => data ?? [], [data]);

    if (isLoading) {
        return (
            <div className="flex h-[calc(100dvh-4rem)] items-center justify-center p-4">
                <ChatLoading />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex h-[calc(100dvh-4rem)] items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-bold text-foreground">
                        Ocorreu um erro ao carregar as mensagens
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Tente recarregar a página ou selecione outra conversa
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-[calc(100dvh-4rem)] flex-col bg-background transition-colors">
            {
                messages?.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center p-4">
                        <div className="text-center">
                            <h1 className="mb-4 text-2xl font-bold text-foreground">
                                Nenhuma mensagem ainda
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Envie uma mensagem para começar a conversar
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <div className="flex flex-col gap-4 p-4">
                            {messages?.map((msg) => {
                                return (
                                <div key={msg.messageId} className={`flex ${msg.itsme ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs rounded-lg p-3 shadow-sm ${msg.itsme ? 'bg-[#6C5CE7] text-white' : 'bg-muted text-foreground'}`}>
                                        <p>{msg.content}</p>
                                        <div className="flex gap-2 items-center mt-2">
                                            <span className={`block text-right text-xs ${msg.itsme ? 'text-blue-100' : 'text-muted-foreground'}`}>
                                                {formatTime(msg.createdAt) || ''}
                                            </span>
                                            {
                                                msg.itsme && (
                                                    msg.readAt ? (
                                                        <CheckCheck size={16} className="text-green-300" />
                                                    ) : (
                                                        <Check size={16} className="text-white/80" />
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                            })}
                        </div>
                    </div>
                )
            }
            
            <div className="shrink-0">
                <SendMessageButton conversationId={conversationId} />
            </div>
        </div>
        
    )
}
