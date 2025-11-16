import { cn } from "@/utils/cn";

export default function Container({ className = "", children }) {
  return <div className={cn(`mx-auto max-w-5xl`, className)}>{children}</div>;
}
