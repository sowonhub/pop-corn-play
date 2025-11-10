import { cn } from "@/cn.js";

export default function Button({ type = "button", className, ...props }) {
  return (
    <button
      type={type}
      className={cn(
        `inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800 active:scale-[0.98] ${className}`,
      )}
      {...props}
    />
  );
}
