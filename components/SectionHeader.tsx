import { UserRound } from "lucide-react";

export function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-2xl bg-[#6C5CE7]/10 p-2 text-[#6C5CE7]">
        <Icon className="size-5" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-[#181C2A] dark:text-white">{title}</h2>
        <p className="mt-1 text-sm text-[#6D7388] dark:text-[#A7AEC6]">{description}</p>
      </div>
    </div>
  );
}