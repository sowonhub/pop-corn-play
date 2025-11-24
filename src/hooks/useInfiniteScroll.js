import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback, hasMore = true) {
  const observerRef = useRef(null);
  const elementRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callbackRef.current?.();
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current = observer;

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore]); // callback 제거하여 리렌더링 시 observer 재생성 방지

  return elementRef;
}
