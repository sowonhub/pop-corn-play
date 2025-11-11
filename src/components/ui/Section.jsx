import { cn } from "@/utils/cn.js";
import { useId } from "react";

export default function section({
  title,
  titleDescription,
  // as: Tag = "section",
  className,
  children,
}) {
  const headingId = useId();

  return (
    <section
      className={cn("mb-8 md:mb-10", className)}
      aria-labelledby={title ? headingId : undefined}
    >
      {(title || titleDescription) && (
        <div className={cn("mb-4 flex items-end justify-between gap-3")}>
          {title && (
            <h2
              id={headingId}
              className={cn(
                "text-xl font-semibold text-neutral-900 md:text-2xl dark:text-neutral-100",
              )}
            >
              {title}
            </h2>
          )}
          {titleDescription && (
            <div
              className={cn("text-sm text-neutral-500 dark:text-neutral-400")}
            >
              {titleDescription}
            </div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
