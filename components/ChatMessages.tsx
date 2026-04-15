'use client';

import { useQuery } from "@tanstack/react-query"
import { SendMessageButton } from "./SendMessageButton"
import { messagesService } from "@/services/messagesService"
import { useMemo } from "react"
import { formatTime } from "@/lib/utils";
import { CheckCheck, Check } from "lucide-react";

export const ChatMessages = ({ conversationId }: { conversationId: string }) => {

    const {data, isLoading, isError} = useQuery({
        queryKey: ['myMessages', conversationId],
        queryFn: () => messagesService.getMessages(conversationId),
        enabled: !!conversationId,
    })

    const messages = useMemo(() => data ?? [], [data])

    console.log('Fetched messages:', messages)
    

    return (
        <div className="flex flex-col h-screen md:ml-80 md:mt-16">
            {
                messages?.length === 0 ? (
                    <div className="h-full flex items-center justify-center p-4">
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
                    <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
                        {messages?.map((msg) => {
                            console.log('Message read status:', msg.readAt)
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
                )
            }
            
            <div className="sticky bottom-0">
                <SendMessageButton conversationId={conversationId} />
            </div>
        </div>
        
    )
}