import { cn } from "@/utils/cn";

import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";

export default function AuthSocialButtons({
  onKakaoLogin,
  onGoogleLogin,
  loading,
  className,
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-3", className)}>
      <KakaoLoginButton onClick={onKakaoLogin} loading={loading} />
      <GoogleLoginButton onClick={onGoogleLogin} loading={loading} />
    </div>
  );
}
