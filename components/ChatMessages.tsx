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
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Ocorreu um erro ao carregar as mensagens
                    </h1>
                    <p className="text-lg text-gray-600">
                        Tente recarregar a página ou selecione outra conversa
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-[calc(100dvh-4rem)] flex-col bg-gray-50">
            {
                messages?.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center p-4">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">
                                Nenhuma mensagem ainda
                            </h1>
                            <p className="text-lg text-gray-600">
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
                                    <div className={`max-w-xs p-3 rounded-lg ${msg.itsme ? 'bg-[#6C5CE7] text-white' : 'bg-gray-200 text-gray-900'}`}>
                                        <p>{msg.content}</p>
                                        <div className="flex gap-2 items-center mt-2">
                                            <span className={`text-xs ${msg.itsme ? 'text-blue-100' : 'text-gray-500'} block text-right`}>
                                                {formatTime(msg.createdAt) || ''}
                                            </span>
                                            {
                                                msg.itsme && (
                                                    msg.readAt ? (
                                                        <CheckCheck size={16} className="text-green-300" />
                                                    ) : (
                                                        <Check size={16} className="text-white-500" />
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
