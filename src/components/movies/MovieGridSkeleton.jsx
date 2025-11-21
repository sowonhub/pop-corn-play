import { Skeleton } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function MovieGridSkeleton({ count = 10, className }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
        >
          <Skeleton className="aspect-2/3 w-full" />
          <div className="space-y-2 p-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

