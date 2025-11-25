import {
  AuthActionPrompt,
  AuthCard,
  AuthDivider,
  AuthLayout,
  AuthSocialButtons,
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
    <AuthLayout>
      <AuthCard>
        <LoginIntro />

        <div className="space-y-6">
          <AuthSocialButtons
            onKakaoLogin={handleKakaoLogin}
            onGoogleLogin={handleGoogleLogin}
            loading={socialLoading}
          />
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
    </AuthLayout>
  );
}
