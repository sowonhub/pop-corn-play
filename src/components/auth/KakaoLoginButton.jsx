import kakaoLogo from "@/assets/logo/kakao-logo.svg";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function KakaoLoginButton({ onClick, loading, className }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={cn(
        "flex w-full items-center justify-center gap-2 border-none bg-[#FEE500] text-[#000000] hover:bg-[#FDD835] focus:ring-yellow-500",
        className,
      )}
    >
      <img src={kakaoLogo} alt="Kakao Logo" className="h-5 w-5" />
      <span>{loading ? "카카오 로그인 중..." : "카카오로 시작하기"}</span>
    </Button>
  );
}
