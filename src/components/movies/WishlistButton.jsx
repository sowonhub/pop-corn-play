import { cn } from "@/utils/cn";

export default function WishlistButton({
  isWishlisted,
  onClick,
  className,
  variant = "icon", // 'icon' | 'text'
  label = "위시리스트",
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(e);
      }}
      className={cn(
        "group relative inline-flex items-center justify-center transition-all active:scale-95",
        variant === "icon" && "h-9 w-9 rounded-full",
        variant === "text" &&
          "h-10 gap-2 rounded-xl border px-4 text-sm font-medium",
        // Active State (Wishlisted)
        isWishlisted && [
          "text-rose-500",
          variant === "icon" &&
            "bg-white shadow-md ring-1 ring-rose-500/20 dark:bg-neutral-800",
          variant === "text" &&
            "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-400",
        ],
        // Inactive State
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isWishlisted ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "transition-transform duration-300 ease-out",
          variant === "icon" ? "h-5 w-5" : "h-4 w-4",
          isWishlisted ? "scale-110" : "scale-100 group-hover:scale-110",
        )}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      {variant === "text" && <span>{label}</span>}
    </button>
  );
}
