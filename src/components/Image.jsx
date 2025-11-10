import { TMDB_IMG_SRC, tmdbImgSrc } from "@/api/auth/TMDB.js";
import { cn } from "@/cn.js";

/**
 * props:
 * - src: TMDB path 또는 절대 URL
 * - type: 'poster' | 'backdrop' | 'thumb' | 'original'
 * - width/height: 성능·LCP 위해 가능하면 지정
 */
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
      e.currentTarget.onerror = null; // 루프 방지
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
