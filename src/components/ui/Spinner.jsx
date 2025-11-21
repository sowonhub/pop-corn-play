import { cn } from "@/utils/cn";

export default function Spinner({ className }) {
  return (
    <div
      className={cn(
        "h-6 w-6 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent dark:border-neutral-600",
        className,
      )}
    />
  );
}
