import { Image, Section, SectionHeader } from "@/components/ui";
import searchPlusIcon from "@/assets/icons/search-plus.svg?raw";
import closeIcon from "@/assets/icons/close.svg?raw";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

export default function MovieGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="mt-16 border-t border-neutral-200 pt-16 dark:border-neutral-800">
        <Section header={<SectionHeader title="갤러리" />}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.slice(0, 7).map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image.file_path)}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900",
                  index === 0
                    ? "aspect-video sm:col-span-2 sm:row-span-2"
                    : "aspect-video",
                )}
              >
                <Image
                  src={image.file_path}
                  type="backdrop"
                  alt={`Gallery Image ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                  <div className="inline-flex h-12 w-12 items-center justify-center scale-0 rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <span
                      className="inline-block h-6 w-6"
                      aria-hidden
                      dangerouslySetInnerHTML={{ __html: searchPlusIcon }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex animate-in fade-in items-center justify-center bg-black/90 p-4 backdrop-blur-sm duration-200"
          onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <span
                className="inline-block h-6 w-6"
                aria-hidden
                dangerouslySetInnerHTML={{ __html: closeIcon }}
              />
            </button>
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              type="original"
              alt="Full size image"
              className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
