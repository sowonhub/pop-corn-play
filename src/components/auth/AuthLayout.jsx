import { cn } from "@/utils/cn";

export default function AuthLayout({ children, className }) {
  return (
    <div
      className={cn(
        "flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 pt-20 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
