import googleLogo from "@/assets/logo/google-logo.svg";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function GoogleLoginButton({ onClick, loading, className }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={cn(
        "flex w-full items-center justify-center gap-2 border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-100",
        className,
      )}
    >
      <img src={googleLogo} alt="Google Logo" className="h-5 w-5" />
      <span>{loading ? "구글 로그인 중..." : "구글로 시작하기"}</span>
    </Button>
  );
}
