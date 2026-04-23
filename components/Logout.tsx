'use client';

import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { authClient } from "@/lib/auth-client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Logout = () => {

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/auth");
                    }
                }
            });
        } catch (error) {
            console.error("Error during logout:", error);
        }
        finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="rounded-[24px] border border-[#E8EAF4] bg-white p-4 transition-colors dark:border-[#31384D] dark:bg-[#111723]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="font-medium text-[#181C2A] dark:text-white">
                        Sair da conta
                    </p>
                    <p className="mt-1 text-sm text-[#6D7388] dark:text-[#A7AEC6]">
                        Botão já posicionado para você ligar ao logout.
                    </p>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer border-[#D9DEEB] bg-white text-[#181C2A] hover:bg-[#F7F8FC] dark:border-[#3A4158] dark:bg-[#111723] dark:text-white dark:hover:bg-[#171E2C]"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                >
                    <LogOut className="size-4" />
                    {isLoggingOut ? "Saindo..." : "Sair"}
                </Button>
            </div>
        </div>
    )
}