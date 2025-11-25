import { Image } from "@/components/ui";
import { useEffect, useState } from "react";

const BANNER_AUTO_SLIDE_INTERVAL_MS = 5000;

export default function MovieBackdrop({ images = [], backdropPath }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const displayImages =
    images?.length > 0
      ? images.slice(0, 5)
      : backdropPath
        ? [{ file_path: backdropPath }]
        : [];

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [backdropPath, images]);

  useEffect(() => {
    if (displayImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }, BANNER_AUTO_SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [displayImages.length]);

  if (displayImages.length === 0) return null;

  return (
    <div className="absolute inset-0 -z-10 h-[70vh] w-full overflow-hidden">
      {displayImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.file_path}
            type="backdrop"
            alt=""
            wrapperClassName="h-full w-full"
            className={`h-full w-full object-cover opacity-50 blur-sm dark:opacity-40 ${
              index === currentImageIndex ? "animate-ken-burns" : ""
            }`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/60 to-white dark:via-neutral-950/60 dark:to-neutral-950" />
    </div>
  );
}
