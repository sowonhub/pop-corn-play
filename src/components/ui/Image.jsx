import {
  MOVIE_IMAGE_CONFIG,
  getMovieImageUrl,
} from "@/services/movie-database";
import { cn } from "@/utils/cn.js";

export default function Image({
  src,
  alt = "",
  type = "poster",
  size,
  className,
  ...rest
}) {
  const onError = (e) => {
    if (e?.currentTarget) {
      e.currentTarget.src = MOVIE_IMAGE_CONFIG.NO_IMAGE;
      e.currentTarget.onerror = null;
    }
  };

  return (
    <img
      loading="lazy"
      decoding="async"
      src={getMovieImageUrl(src, type, size)}
      alt={alt}
      onError={onError}
      className={cn("block h-auto max-w-full", className)}
      {...rest}
    />
  );
}
