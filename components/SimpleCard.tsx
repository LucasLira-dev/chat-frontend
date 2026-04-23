'use client';

import { useTheme } from "@/contexts/theme-context";


export const SimpleCards = ({nicknamePreview}: {nicknamePreview: string}) => {

    const { theme } = useTheme();
    const modeLabel = theme === 'light' ? 'Claro' : theme === 'dark' ? 'Escuro' : 'Sistema';

    return (
        <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[24px] border border-[#E8EAF4] bg-[#FBFCFF] px-4 py-3 dark:border-[#31384D] dark:bg-[#111723]">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8A90A5] dark:text-[#98A0BC]">
                    Nickname
                </p>
                <p className="mt-2 text-base font-semibold text-[#181C2A] dark:text-white">
                    {nicknamePreview}
                </p>
            </div>

            <div className="rounded-[24px] border border-[#E8EAF4] bg-[#FBFCFF] px-4 py-3 dark:border-[#31384D] dark:bg-[#111723]">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8A90A5] dark:text-[#98A0BC]">
                    Aparência
                </p>
                <p className="mt-2 text-base font-semibold text-[#181C2A] dark:text-white">
                    {modeLabel}
                </p>
            </div>
        </div>
    )
}