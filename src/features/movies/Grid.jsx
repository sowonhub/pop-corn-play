import { cn } from "@/cn.js";
import Button from "@/components/Button.jsx";
import Skeleton from "@/components/Skeleton.jsx";
import { usePopular } from "@/features/movies/hooks/usePopular.js";
import Card from "./Card.jsx";

export default function Grid() {
  const { data, loading, error } = usePopular(); // page=1 기본

  if (loading) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        )}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900",
            )}
          >
            <Skeleton className={cn("aspect-2/3 w-full")} />
            <div className={cn("space-y-2 p-3")}>
              <Skeleton className={cn("h-4 w-3/4")} />
              <Skeleton className={cn("h-3 w-1/3")} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "rounded-lg border border-red-700 bg-red-900/20 p-4 text-sm text-red-300",
        )}
      >
        불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        <div className={cn("mt-3")}>
          <Button onClick={() => location.reload()}>새로고침</Button>
        </div>
      </div>
    );
  }

  const list = data?.results ?? [];
  if (list.length === 0) {
    return (
      <div
        className={cn(
          "rounded-lg border border-neutral-800 bg-neutral-900 p-6 text-center text-neutral-300",
        )}
      >
        표시할 영화가 없어요.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
      )}
    >
      {list.map((m) => (
        <Card key={m.id} movie={m} />
      ))}
    </div>
  );
}
