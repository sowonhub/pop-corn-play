import { useDatabaseAuth } from "@/auth";
import { PATHS } from "@/router";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useLoginForm() {
  const { login, signInWithProvider } = useDatabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? PATHS.HOME;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault?.();
      setError("");
      setLoading(true);

      try {
        const { error: authError } = await login(email, password);
        if (authError) throw authError;
        navigate(redirectTo, { replace: true });
      } catch {
        setError("이메일 또는 비밀번호를 확인해 주세요.");
      } finally {
        setLoading(false);
      }
    },
    [email, password, login, navigate, redirectTo],
  );

  const handleKakaoLogin = useCallback(async () => {
    setError("");
    setSocialLoading(true);

    try {
      const { error: authError } = await signInWithProvider("kakao", {
        queryParams: {
          scope: "profile_nickname profile_image",
        },
      });
      if (authError) throw authError;
    } catch {
      setError("카카오 로그인에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSocialLoading(false);
    }
  }, [signInWithProvider]);

  const handleGoogleLogin = useCallback(async () => {
    setError("");
    setSocialLoading(true);

    try {
      const { error: authError } = await signInWithProvider("google");
      if (authError) throw authError;
    } catch {
      setError("구글 로그인에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSocialLoading(false);
    }
  }, [signInWithProvider]);

  return {
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
  };
}
