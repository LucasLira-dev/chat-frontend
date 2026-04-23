'use client';

import { Save } from "lucide-react";

import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toastError, toastSuccess } from "./ui/sonner";

interface UpdateNicknameProps {
    nickname: string;
}

export const UpdateNickname = ({ nickname }: UpdateNicknameProps) => {

    const [newNickname, setNewNickname] = useState(nickname);
    const { useSession } = authClient;
    const { refetch } = useSession();

    const handleUpdateNickname = async () => {

        if (newNickname.trim() === "") {
            toastError({ title: "Nickname não pode ser vazio." });
            return;
        }

        try {
            const { error } = await authClient.updateUser(
                { 
                    name: newNickname }, 
                {
			    onSuccess: async () => {
				    await refetch();
			    },
		    });
            if (error) {
                toastError({ title: "Erro ao atualizar nickname." });
            } else {
                toastSuccess({ title: "Nickname atualizado com sucesso!" });
            }
        } catch (error) {
            console.error("Error updating nickname:", error);
            toastError({ title: "Erro ao atualizar nickname." });
        }
    }

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-end mt-2">
            <div className="flex-1">
                <input
                    id="nickname"
                    type="text"
                    value={newNickname}
                    onChange={(event) => setNewNickname(event.target.value)}
                    placeholder="Digite seu novo nickname"
                    className="h-12 w-full rounded-[20px] border border-[#DDE2EF] bg-white px-4 text-sm text-[#181C2A] outline-none transition-all placeholder:text-[#9AA1B6] focus:border-[#6C5CE7]/50 focus:ring-4 focus:ring-[#6C5CE7]/10 dark:border-[#31384D] dark:bg-[#0E1421] dark:text-white dark:placeholder:text-[#7F879F]"
                />
            </div>

            <Button
                type="button"
                className="h-12 min-w-44 cursor-pointer bg-[#6C5CE7] text-white hover:bg-[#5A4BCF]"
                disabled={newNickname.trim() === "" || newNickname === nickname}
                onClick={handleUpdateNickname}
            >
                <Save className="size-4" />
                Salvar nickname
            </Button>
        </div>
    )
}
