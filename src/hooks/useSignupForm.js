import { useDatabaseAuth } from "@/auth";
import { useCallback, useState } from "react";

const MIN_PASSWORD_LENGTH = 8;

const ERROR_MESSAGES = {
  agree: "약관에 동의해 주세요.",
  passwordMismatch: "비밀번호가 일치하지 않습니다.",
  passwordLength: `비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`,
  signup:
    "회원가입에 실패했습니다." +
    "\n" +
    "이메일을 바꾸거나 잠시 후 다시 시도해 주세요.",
};

export default function useSignupForm() {
  const { signUp } = useDatabaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const handlePasswordConfirmChange = useCallback((event) => {
    setPasswordConfirm(event.target.value);
  }, []);

  const handleAgreeChange = useCallback((event) => {
    setAgree(event.target.checked);
  }, []);

  const validate = useCallback(() => {
    if (!agree) return ERROR_MESSAGES.agree;
    if (password !== passwordConfirm) return ERROR_MESSAGES.passwordMismatch;
    if (password.length < MIN_PASSWORD_LENGTH) return ERROR_MESSAGES.passwordLength;
    return "";
  }, [agree, password, passwordConfirm]);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault?.();
      setError("");

      const trimmedEmail = email.trim();
      const validationError = validate();
      if (validationError) {
        setError(validationError);
        return;
      }

      setLoading(true);
      try {
        const { error: signupError } = await signUp(trimmedEmail, password);
        if (signupError) throw signupError;
        setIsComplete(true);
      } catch {
        setError(ERROR_MESSAGES.signup);
      } finally {
        setLoading(false);
      }
    },
    [email, password, signUp, validate],
  );

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setAgree(false);
    setError("");
    setIsComplete(false);
    setLoading(false);
  }, []);

  const trimmedEmail = email.trim();
  const canSubmit =
    !loading &&
    agree &&
    trimmedEmail.length > 0 &&
    password.length >= MIN_PASSWORD_LENGTH &&
    passwordConfirm.length > 0 &&
    password === passwordConfirm;

  return {
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
    resetForm,
  };
}
