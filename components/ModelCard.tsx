import { cn } from "@/lib/utils";
import { SunMedium } from "lucide-react";

export function ModeCard({
  active,
  description,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  description: string;
  icon: typeof SunMedium;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-[24px] border px-4 py-4 text-left transition-all",
        active
          ? "border-[#6C5CE7]/45 bg-[#F6F2FF] shadow-[0_12px_30px_rgba(108,92,231,0.12)] dark:bg-[#221C3F]"
          : "border-[#E8EAF4] bg-white hover:border-[#D7DBEA] hover:bg-[#FAFBFF] dark:border-[#31384D] dark:bg-[#111723] dark:hover:border-[#4A526B] dark:hover:bg-[#171E2C]",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "rounded-2xl p-2",
            active ? "bg-[#6C5CE7] text-white" : "bg-[#F1F3F9] text-[#6D7388] dark:bg-[#252C3C] dark:text-[#A7AEC6]",
          )}
        >
          <Icon className="size-4" />
        </div>
        <div>
          <p className="font-medium text-[#181C2A] dark:text-white">{label}</p>
          <p className="text-sm text-[#6D7388] dark:text-[#A7AEC6]">{description}</p>
        </div>
      </div>

      <div
        className={cn(
          "size-5 rounded-full border transition-colors",
          active ? "border-[#6C5CE7] bg-[#6C5CE7]" : "border-[#D6DAE8] bg-white dark:border-[#4A526B] dark:bg-[#111723]",
        )}
      />
    </button>
  );
}