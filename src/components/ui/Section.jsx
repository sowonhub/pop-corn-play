import { cn } from "@/utils/cn";

export default function Section({ header, className, children }) {
  return (
    <section className={cn("mb-8", className)}>
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
      <div className={cn("flex items-end justify-between gap-3", className)}>
        {title && (
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>
        )}
        {description && (
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {description}
          </div>
        )}
      </div>
    );
  }

  return null;
}
