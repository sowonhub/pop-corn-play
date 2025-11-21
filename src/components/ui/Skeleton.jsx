import { cn } from "@/utils/cn";

function Skeleton({ className = "" }) {
  return (
    <div
      className={cn(`animate-pulse rounded-md bg-neutral-800/60`, className)}
    />
  );
}

export default Skeleton;
export { Skeleton };
