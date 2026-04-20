'use client';

import { type ComponentProps, useState } from "react";
import { MoreVertical } from "lucide-react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

import { useMessages } from "@/hooks/useMessages";
import { cn } from "@/lib/utils";
import { conversationsService } from "@/services/conversationsService"
import { messagesService } from "@/services/messagesService";
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { toastError, toastSuccess } from "./ui/sonner"

type ConfirmAction = "deleteConversation" | "deleteMessages" | null;

interface ConversationOptionsProps {
    conversationId?: string;
    buttonClassName?: string;
    buttonSize?: ComponentProps<typeof Button>["size"];
    iconSize?: number;
}

export const ConversationOptions = ({
    conversationId,
    buttonClassName,
    buttonSize = "sm",
    iconSize = 18,
}: ConversationOptionsProps) => {
    const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

    const router = useRouter();
    const queryClient = useQueryClient();

    const { messagesLength } = useMessages(conversationId);

    const deleteConversationMutation = useMutation({
        mutationFn: async (conversationId: string) =>
            conversationsService.deleteConversation(conversationId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['myConversations'] });
            toastSuccess({ title: "Sucesso", description: "Conversa DELETADA com sucesso!" });                   
            router.push(`/`);
        },
        onError: (error) => {
            console.error("Error deleting conversation:", error);
            toastError({ title: "Erro", description: "Erro ao deletar conversa." });
        },
        onSettled: () => {
            setConfirmAction(null);
        },
    })

    const deleteMessagesMutation = useMutation({
        mutationFn: async (conversationId: string) =>
            messagesService.deleteMessages(conversationId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['myMessages', conversationId] });
            await queryClient.invalidateQueries({ queryKey: ['myConversations'] });
            toastSuccess({ title: "Sucesso", description: "Mensagens APAGADAS com sucesso!" });
        },
        onError: (error) => {
            console.error("Error deleting messages:", error);
            toastError({ title: "Erro", description: "Erro ao deletar mensagens." });
        },
        onSettled: () => {
            setConfirmAction(null);
        },
    })

    const openDeleteConversationDialog = () => {
        if (!conversationId) {
            return;
        }

        setConfirmAction("deleteConversation");
    }

    const openDeleteMessagesDialog = () => {
        if (!conversationId || messagesLength === 0) {
            return;
        }

        setConfirmAction("deleteMessages");
    }

    const handleConfirmAction = () => {
        if (!conversationId) {
            return;
        }

        if (confirmAction === "deleteConversation") {
            deleteConversationMutation.mutate(conversationId);
            return;
        }

        if (confirmAction === "deleteMessages") {
            deleteMessagesMutation.mutate(conversationId);
        }
    }

    const isPending = deleteConversationMutation.isPending || deleteMessagesMutation.isPending;

    const dialogTitle = confirmAction === "deleteMessages"
        ? "Apagar mensagens"
        : "Apagar conversa";

    const dialogDescription = confirmAction === "deleteMessages"
        ? "Tem certeza que deseja deletar TODAS as mensagens desta conversa? Esta ação não pode ser desfeita."
        : "Tem certeza que deseja deletar esta conversa? Esta ação não pode ser desfeita.";

    const confirmButtonLabel = confirmAction === "deleteMessages"
        ? "Apagar mensagens"
        : "Apagar conversa";

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size={buttonSize} className={cn("cursor-pointer", buttonClassName)}>
                    <MoreVertical size={iconSize} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuLabel>Opções</DropdownMenuLabel>
                  {
                    messagesLength > 0 && (
                        <DropdownMenuItem className="cursor-pointer" onSelect={openDeleteMessagesDialog} disabled={!conversationId || messagesLength === 0}>
                            Apagar mensagens
                        </DropdownMenuItem>
                    )
                  }
                  <DropdownMenuItem className="cursor-pointer" onSelect={openDeleteConversationDialog} disabled={!conversationId}>
                    Apagar conversa
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={confirmAction !== null}
                onOpenChange={(open) => {
                    if (!open && !isPending) {
                        setConfirmAction(null);
                    }
                }}
            >
                <DialogContent className="sm:max-w-md" showCloseButton={!isPending} aria-description={dialogDescription}>
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogDescription>{dialogDescription}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setConfirmAction(null)}
                            disabled={isPending}
                            className="cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmAction}
                            disabled={isPending}
                            className="cursor-pointer"
                        >
                            {isPending ? "Apagando..." : confirmButtonLabel}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
