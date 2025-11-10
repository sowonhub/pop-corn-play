import { cn } from "@/utils/cn.js";
import { useId } from "react";

export default function Section({
  title,
  titleDescription,
  as: Tag = "section",
  className,
  children,
}) {
  const headingId = useId();

  return (
    <Tag
      className={cn("mb-8 md:mb-10", className)}
      aria-labelledby={title ? headingId : undefined}
    >
      {(title || titleDescription) && (
        <div className="mb-4 flex items-end justify-between gap-3">
          {title && (
            <h2
              id={headingId}
              className="text-xl font-semibold text-neutral-900 md:text-2xl dark:text-neutral-100"
            >
              {title}
            </h2>
          )}
          {titleDescription && (
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {titleDescription}
            </div>
          )}
        </div>
      )}
      {children}
    </Tag>
  );
}
