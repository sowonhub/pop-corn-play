import { cn } from "@/utils/cn";

export default function AuthCard({ children, className }) {
  return (
    <div
      className={cn(
        "w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-800",
        className,
      )}
    >
      {children}
    </div>
  );
}
