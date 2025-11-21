import { cn } from "@/utils/cn";

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        `w-full rounded-md border border-neutral-300 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50`,
        className,
      )}
      {...props}
    />
  );
}
