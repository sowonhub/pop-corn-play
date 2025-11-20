import Skeleton from "@/components/ui/Skeleton.jsx";
import useImageLoading from "@/hooks/useImageLoading";
import { cn } from "@/utils/cn";

export default function Image({
  src,
  alt = "",
  type = "poster",
  size,
  className,
  showSkeleton = true,
  ...rest
}) {
  const { imageSrc, loading, handleLoad, handleError } = useImageLoading(
    src,
    type,
    size,
  );

  return (
    <div className="relative">
      {loading && showSkeleton && (
        <Skeleton className="absolute inset-0 rounded-md" />
      )}
      <img
        loading="lazy"
        decoding="async"
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "block h-auto max-w-full",
          loading && showSkeleton && "opacity-0",
          className,
        )}
        draggable={false}
        {...rest}
      />
    </div>
  );
}
