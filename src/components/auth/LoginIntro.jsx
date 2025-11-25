export default function LoginIntro({
  title = "로그인",
  description = "서비스 이용을 위해 로그인이 필요합니다.",
}) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}
