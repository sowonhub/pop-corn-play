import {
  AuthActionPrompt,
  AuthCard,
  AuthDivider,
  GoogleLoginButton,
  KakaoLoginButton,
  LoginForm,
  LoginIntro,
} from "@/components/auth";
import useLoginForm from "@/hooks/useLoginForm";
import { PATHS } from "@/router";

export default function LoginPage() {
  const {
    email,
    password,
    error,
    loading,
    socialLoading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleKakaoLogin,
    handleGoogleLogin,
  } = useLoginForm();

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 pt-20 sm:px-6 lg:px-8">
      <AuthCard>
        <div className="text-center">
          <LoginIntro />
        </div>
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-3">
            <KakaoLoginButton
              onClick={handleKakaoLogin}
              loading={socialLoading}
            />
            <GoogleLoginButton
              onClick={handleGoogleLogin}
              loading={socialLoading}
            />
          </div>
          <AuthDivider />
          <LoginForm
            email={email}
            password={password}
            error={error}
            loading={loading}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onSubmit={handleSubmit}
          />
          <AuthActionPrompt
            message="계정이 없으신가요?"
            linkText="회원가입"
            to={PATHS.SIGNUP}
          />
        </div>
      </AuthCard>
    </div>
  );
}
