import {
  getMovieImageUrl,
  MOVIE_IMAGE_CONFIG,
} from "@/services/movie-database";
import { useEffect, useState } from "react";

export default function useImageLoading(src, type = "poster", size) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(() =>
    getMovieImageUrl(src, type, size),
  );

  useEffect(() => {
    const newSrc = getMovieImageUrl(src, type, size);
    setImageSrc(newSrc);
    setLoading(true);
  }, [src, type, size]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setImageSrc(MOVIE_IMAGE_CONFIG.NO_IMAGE);
  };

  return {
    imageSrc,
    loading,
    handleLoad,
    handleError,
  };
}
