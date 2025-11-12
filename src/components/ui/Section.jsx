import { cn } from "@/utils/cn.js";

/**
 * Section 컴포넌트
 * 제어의 역전: 헤더는 header prop으로 완전히 제어하며, 구조만 제공합니다.
 */
export default function Section({ header, className, children }) {
  return (
    <section className={cn("mb-8 md:mb-10", className)}>
      {header && (
        <div className="mb-4 flex items-end justify-between gap-3">
          {header}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * SectionHeader 헬퍼 컴포넌트
 * 일반적인 헤더 패턴을 쉽게 만들 수 있도록 도와줍니다.
 */
export function SectionHeader({ title, description, children, className }) {
  const hasTitleOrDescription = title || description;
  const hasCustomContent = !!children;

  // children이 있으면 사용자가 제공한 내용을 우선 사용
  if (hasCustomContent) {
    return (
      <div className={cn("flex items-end justify-between gap-3", className)}>
        {children}
      </div>
    );
  }

  // title 또는 description이 있으면 기본 스타일 적용
  if (hasTitleOrDescription) {
    return (
      <div className={cn("flex items-end justify-between gap-3", className)}>
        {title && (
          <h2 className="text-xl font-semibold text-neutral-900 md:text-2xl dark:text-neutral-100">
            {title}
          </h2>
        )}
        {description && (
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {description}
          </div>
        )}
      </div>
    );
  }

  return null;
}
