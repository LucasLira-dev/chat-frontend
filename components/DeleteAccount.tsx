'use client';

import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toastError } from "./ui/sonner";

export const DeleteAccount = () => {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            await authClient.deleteUser({
                callbackURL: `${window.location.origin}/auth`,
            });
            setIsDeleteDialogOpen(false);
        }
        catch (error) {
            toastError({ title: "Erro", description: "Não foi possível deletar a conta. Tente novamente." });
            console.error("Error deleting account:", error);
        }
        finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
        }
    }

    return (
        <div className="rounded-[24px] border border-[#F1D5D5] bg-[#FFF7F7] p-4 transition-colors dark:border-[#613636] dark:bg-[#2A1616]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="font-medium text-[#181C2A] dark:text-white">
                        Deletar conta
                    </p>
                    <p className="mt-1 text-sm text-[#7B6A6A] dark:text-[#E0B3B3]">
                        Área de risco separada visualmente para a ação destrutiva.
                    </p>
                </div>

                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="cursor-pointer"
                >
                    <Trash2 className="size-4" />
                    Deletar conta
                </Button>
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent
                    className="sm:max-w-md dark:border-[#31384D] dark:bg-[#111723] dark:text-white"
                    aria-description="Confirmação visual para deletar a conta."
                >
                    <DialogHeader>
                        <DialogTitle>Deletar conta?</DialogTitle>
                        <DialogDescription>
                            Essa ação é irreversível. Todos os seus dados serão perdidos para sempre.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="rounded-[22px] border border-[#F1D5D5] bg-[#FFF7F7] p-4 text-sm text-[#7B6A6A] dark:border-[#613636] dark:bg-[#2A1616] dark:text-[#E0B3B3]">
                        Tenha certeza do que está fazendo. Se quiser apenas sair, use o botão de logout.
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            className="cursor-pointer"
                            disabled={isDeleting}
                        >
                            <Trash2 className="size-4" />
                            {isDeleting ? "Deletando..." : "Deletar conta"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

