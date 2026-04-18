'use client';

import { MoreVertical } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { conversationsService } from "@/services/conversationsService"
import { toastError, toastSuccess } from "./ui/sonner"
import { useRouter } from "next/navigation";

export const ConversationOptions = ({ conversationId }: { conversationId: string }) => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const deleteConversationMutation = useMutation({
        mutationFn: async (conversationId: string) => {
            conversationsService.deleteConversation(conversationId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['myConversations'] });
            toastSuccess({ title: "Sucesso", description: "Conversa DELETADA com sucesso!" });                   
            router.push(`/`);
        },
        onError: (error) => {
            console.error("Error deleting conversation:", error);
            toastError({ title: "Erro", description: "Erro ao deletar conversa." });
        }
    })

    const handleDeleteConversation = (conversationId: string) => {
        if (confirm("Tem certeza que deseja deletar esta conversa? Esta ação não pode ser desfeita.")) {
            deleteConversationMutation.mutate(conversationId);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">Apagar mensagens</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleDeleteConversation(conversationId)}>
                Apagar conversa
              </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}