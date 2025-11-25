import {
  AuthActionPrompt,
  AuthCard,
  AuthLayout,
  LoginIntro,
  SignupComplete,
  SignupForm,
} from "@/components/auth";
import useSignupForm from "@/hooks/useSignupForm";
import { PATHS } from "@/router";

export default function SignupPage() {
  const {
    email,
    password,
    passwordConfirm,
    agree,
    error,
    isComplete,
    loading,
    canSubmit,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleAgreeChange,
    handleSubmit,
  } = useSignupForm();

  if (isComplete) {
    return <SignupComplete />;
  }

  return (
    <AuthLayout>
      <AuthCard>
        <LoginIntro
          title="회원가입"
          description="새로운 계정을 만들어 서비스를 이용해보세요."
        />

        <SignupForm
          email={email}
          password={password}
          passwordConfirm={passwordConfirm}
          agree={agree}
          error={error}
          loading={loading}
          canSubmit={canSubmit}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onPasswordConfirmChange={handlePasswordConfirmChange}
          onAgreeChange={handleAgreeChange}
          onSubmit={handleSubmit}
        />

        <AuthActionPrompt
          message="이미 계정이 있으신가요?"
          linkText="로그인"
          to={PATHS.LOGIN}
        />
      </AuthCard>
    </AuthLayout>
  );
}
