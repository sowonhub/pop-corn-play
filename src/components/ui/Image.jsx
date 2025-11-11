import { TMDB_IMG_SRC, tmdbImgSrc } from "@/services/tmdb";
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
      e.currentTarget.src = TMDB_IMG_SRC.NO_IMAGE;
      e.currentTarget.onerror = null;
    }
  };

  return (
    <img
      loading="lazy"
      decoding="async"
      src={tmdbImgSrc(src, type, size)}
      alt={alt}
      onError={onError}
      className={cn("block h-auto max-w-full", className)}
      {...rest}
    />
  );
}
