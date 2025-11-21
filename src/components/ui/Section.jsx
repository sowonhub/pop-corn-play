import { cn } from "@/utils/cn";

export default function Section({ header, className, children }) {
  return (
    <section className={cn("mb-8 last:mb-0", className)}>
      {header && (
        <div className="mb-4 flex items-end justify-between gap-3">
          {header}
        </div>
      )}
      {children}
    </section>
  );
}

export function SectionHeader({ title, description, children, className }) {
  const hasTitleOrDescription = title || description;
  const hasCustomContent = !!children;

  if (hasCustomContent) {
    return (
      <div className={cn("flex items-end justify-between gap-3", className)}>
        {children}
      </div>
    );
  }

  if (hasTitleOrDescription) {
    return (
      <div className={cn("mb-2 flex flex-col gap-1", className)}>
        {title && (
          <h2 className="flex items-center gap-2 text-[clamp(1rem,5vw,2rem)] font-bold tracking-tight text-neutral-900 dark:text-white">
            {/* 포인트 라인 */}
            <span className="h-8 w-1.5 rounded-full bg-linear-to-b from-rose-500 to-orange-400 md:h-9" />
            {title}
          </h2>
        )}
        {description && (
          <div className="pl-3.5 text-sm font-medium text-neutral-500 md:text-base dark:text-neutral-400">
            {description}
          </div>
        )}
      </div>
    );
  }

  return null;
}
