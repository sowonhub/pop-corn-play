export default function Container({ className = "", children }) {
  // 넓은 화면에서도 콘텐츠 폭을 5xl로 제한, 패딩은 반응형으로
  return (
    <div className={`mx-auto max-w-5xl px-4 sm:px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
