import { cn } from "@/utils/cn";

export default function AuthDivider({
  label = "또는 이메일로 로그인",
  className,
  lineClassName,
  labelClassName,
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 flex items-center">
        <div
          className={cn(
            "w-full border-t border-neutral-300 dark:border-neutral-700",
            lineClassName,
          )}
        />
      </div>
      <div className="relative flex justify-center text-sm">
        <span
          className={cn(
            "bg-white px-2 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
            labelClassName,
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
