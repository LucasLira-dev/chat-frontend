'use client';

import { useState } from "react";

import { Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messagesService } from "@/services/messagesService";
import { toastError } from "./ui/sonner";

export const SendMessageButton = ({ conversationId }: { conversationId: string }) => {

    const [messageContent, setMessageContent] = useState("");
    const queryClient = useQueryClient();

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
            sendMessageMutation.mutate(messageContent);
            setMessageContent("");
        }
        catch (error) {
            console.error("Error sending message:", error);
            toastError({ title: "Erro", description: "Não foi possível enviar a mensagem. Tente novamente." });
        }
    }

    return (
        <div className="flex gap-2 p-4 bg-white border-t border-gray-200">
            <input 
                type="text" 
                className="flex-1 bg-primary/10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent placeholder:pl-2 p-2" 
                placeholder="Digite sua mensagem..." 
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
            />
            <button 
                className="bg-[#5A4BCF] text-white p-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={messageContent.trim() === "" || sendMessageMutation.isPending}
            >
                <Send size={20} />
            </button>
        </div>
    )
}