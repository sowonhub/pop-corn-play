import heartFilledIcon from "@/assets/icons/heart-filled.svg?raw";
import heartIcon from "@/assets/icons/heart.svg?raw";
import { cn } from "@/utils/cn";

export default function WishlistButton({
  isWishlisted,
  onClick,
  disabled = false,
  className,
  variant = "icon",
  label = "위시리스트",
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(e);
      }}
      className={cn(
        "group relative inline-flex items-center justify-center transition-all active:scale-95",
        disabled && "cursor-not-allowed opacity-60",
        variant === "icon" && "h-9 w-9 rounded-full",
        variant === "text" &&
          "h-10 gap-2 rounded-xl border px-4 text-sm font-medium",
        isWishlisted && [
          "text-rose-500",
          variant === "icon" &&
            "bg-white shadow-md ring-1 ring-rose-500/20 dark:bg-neutral-800",
          variant === "text" &&
            "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-400",
        ],
        !isWishlisted && [
          "text-neutral-500 hover:text-rose-400",
          variant === "icon" &&
            "bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-black/50 dark:text-neutral-300 dark:hover:bg-black/70",
          variant === "text" &&
            "border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
        ],
        className,
      )}
      aria-pressed={isWishlisted}
      aria-label={isWishlisted ? "위시리스트에서 제거" : "위시리스트에 추가"}
    >
      <span
        className={cn(
          "inline-block transition-transform duration-300 ease-out",
          variant === "icon" ? "h-5 w-5" : "h-4 w-4",
          isWishlisted ? "scale-110" : "scale-100 group-hover:scale-110",
        )}
        aria-hidden
        dangerouslySetInnerHTML={{
          __html: isWishlisted ? heartFilledIcon : heartIcon,
        }}
      />
      {variant === "text" && <span>{label}</span>}
    </button>
  );
}
