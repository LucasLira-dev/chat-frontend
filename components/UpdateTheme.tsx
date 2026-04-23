'use client';

import { useTheme } from "@/contexts/theme-context";
import { SectionHeader } from "./SectionHeader"
import { MoonStar, SunMedium } from "lucide-react";
import { ModeCard } from "./ModelCard";
import { cn } from "@/lib/utils";

export const UpdateTheme = () => {

    const { theme: mode, setTheme } = useTheme();

    const modeLabel = mode === 'light' ? 'Claro' : mode === 'dark' ? 'Escuro' : 'Sistema';
    const nicknamePreview = "Seu nickname";

    return (
        <section className="rounded-[28px] border border-[#E8EAF4] bg-[#FCFCFE] p-5 transition-colors dark:border-[#2E3548] dark:bg-[#101522]">
            <SectionHeader
                icon={mode === "light" ? SunMedium : MoonStar}
                title="Modo"
                description="Tema aplicado ao app e salvo no navegador."
            />

            <div className="mt-5 grid gap-3 lg:grid-cols-2">
                <ModeCard
                    active={mode === "light"}
                    description="Visual mais leve e brilhante."
                    icon={SunMedium}
                    label="Modo claro"
                    onClick={() => setTheme("light")}
                />
                <ModeCard
                    active={mode === "dark"}
                    description="Visual mais sóbrio para uso noturno."
                    icon={MoonStar}
                    label="Modo escuro"
                    onClick={() => setTheme("dark")}
                />
            </div>

            <div
                className={cn(
                    "mt-4 rounded-[28px] border p-4 transition-all",
                    mode === "light"
                        ? "border-[#E8EAF4] bg-[#F7F8FC]"
                        : "border-[#2F3447] bg-[#181C28]",
                )}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p
                            className={cn(
                                "text-sm font-semibold",
                                mode === "light" ? "text-[#181C2A]" : "text-white",
                            )}
                        >
                            Prévia do modo
                        </p>
                        <p
                            className={cn(
                                "mt-1 text-sm",
                                mode === "light"
                                    ? "text-[#6D7388]"
                                    : "text-[#A7AEC6]",
                            )}
                        >
                            Assim essa área responde ao tema selecionado.
                        </p>
                    </div>

                    <div
                        className={cn(
                            "rounded-full px-3 py-1 text-xs font-medium",
                            mode === "light"
                                ? "bg-white text-[#5A4BCF]"
                                : "bg-white/10 text-white",
                        )}
                    >
                        {modeLabel}
                    </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                    <div
                        className={cn(
                            "rounded-[22px] p-4",
                            mode === "light"
                                ? "bg-white shadow-sm"
                                : "bg-[#232838] shadow-none",
                        )}
                    >
                        <p
                            className={cn(
                                "text-sm font-medium",
                                mode === "light"
                                    ? "text-[#181C2A]"
                                    : "text-white",
                            )}
                        >
                            {nicknamePreview}
                        </p>
                        <p
                            className={cn(
                                "mt-1 text-sm",
                                mode === "light"
                                    ? "text-[#6D7388]"
                                    : "text-[#A7AEC6]",
                            )}
                        >
                            Visualizando a interface em {mode === "light" ? "claro" : "escuro"}.
                        </p>
                    </div>

                    <div
                        className={cn(
                            "rounded-[22px] border p-4",
                            mode === "light"
                                ? "border-[#E8EAF4] bg-[#FBFCFF]"
                                : "border-[#31384D] bg-[#202536]",
                        )}
                    >
                        <p
                            className={cn(
                                "text-xs uppercase tracking-[0.16em]",
                                mode === "light"
                                    ? "text-[#8A90A5]"
                                    : "text-[#98A0BC]",
                            )}
                        >
                            Resumo
                        </p>
                        <p
                            className={cn(
                                "mt-2 text-sm font-medium",
                                mode === "light"
                                    ? "text-[#181C2A]"
                                    : "text-white",
                            )}
                        >
                            Tema real do app aplicado e persistido localmente.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}