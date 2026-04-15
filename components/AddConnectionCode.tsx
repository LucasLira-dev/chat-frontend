'use client';

import { UserPlus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { conversationsService } from "@/services/conversationsService";
import { toastError, toastSuccess } from "./ui/sonner";

export const AddConnectionCode = () => {

    const [connectionCode, setConnectionCode] = useState("");
    const router = useRouter();

    const sendCodeMutation = useMutation({
        mutationFn: async (code: string) =>
            conversationsService.createConversation(code),
            onSuccess: (data) => {
                toastSuccess({ title: "Sucesso", description: "Conversa criada com sucesso!" });
                const conversationId = data.conversationId;                     
                router.push(`/conversations/${conversationId}`);
        },
        onError: (error) => {
            console.error("Error creating conversation:", error);
            toastError({ title: "Erro", description: "Não foi possível criar a conversa. Verifique o código e tente novamente." });
        }
    })

    const sendConnectionCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!connectionCode.trim()) {
            toastError({ title: "Erro", description: "Por favor, insira um código de conexão válido." });
            return;
        }

        sendCodeMutation.mutate(connectionCode);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <UserPlus className="cursor-pointer" size={20}/>
            </DialogTrigger>
            <DialogContent className="w-full md:w-1/3">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-[#5A4BCF]">Adicionar Conexão</DialogTitle>
                    <DialogDescription className="text-sm text-gray-800">
                        Adicione o código de conexão fornecido pelo seu amigo para iniciar uma conversa privada.
                    </DialogDescription>
                </DialogHeader>
                <form className="mt-4" onSubmit={sendConnectionCode}>
                    <label htmlFor="connectionCode" className="block text-md font-bold text-gray-700">
                        Código de Conexão
                    </label>
                    <input
                        type="text"
                        id="connectionCode"
                        name="connectionCode"
                        value={connectionCode}
                        onChange={(e) => setConnectionCode(e.target.value)}
                        className="bg-primary/10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent placeholder:pl-2 w-full mt-1 p-2"
                        placeholder="Digite o código de conexão"
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#5A4BCF] hover:bg-[#4A3BBF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C5CE7] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={connectionCode.trim() === "" || sendCodeMutation.isPending}
                    >
                        Adicionar Conexão
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}