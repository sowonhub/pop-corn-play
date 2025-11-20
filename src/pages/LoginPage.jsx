import { useDatabaseAuth } from "@/auth";
import { Input } from "@/components/ui";
import { PATHS } from "@/router";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, signInWithProvider } = useDatabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? PATHS.HOME;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await login(email, password);
      if (error) throw error;
      navigate(redirectTo, { replace: true });
    } catch {
      setError("이메일 또는 비밀번호를 확인해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    setError("");
    setSocialLoading(true);

    try {
      // queryParams에 scope를 설정하여 이메일(account_email)을 제외하고 요청
      // 필요한 권한만 공백으로 구분하여 나열 (예: profile_nickname, profile_image)
      const { error } = await signInWithProvider("kakao", {
        queryParams: {
          scope: "profile_nickname profile_image",
        },
      });
      if (error) throw error;
    } catch {
      setError("카카오 로그인에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSocialLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSocialLoading(true);

    try {
      const { error } = await signInWithProvider("google");
      if (error) throw error;
    } catch {
      setError("구글 로그인에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="mb-4 text-xl font-semibold">로그인</h1>
      <div className="mt-4 mb-4 space-y-2">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={socialLoading}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60"
        >
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/color-pixels/32/google-logo.png"
            alt="google-logo"
          />
          {socialLoading ? "구글로 이동 중…" : "구글로 계속하기"}
        </button>
        <button
          type="button"
          onClick={handleKakaoLogin}
          disabled={socialLoading}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-yellow-400 bg-yellow-400/20 px-3 py-2 text-sm font-semibold text-yellow-900 transition hover:bg-yellow-400/40 disabled:opacity-60"
        >
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/32/external-free-instant-messaging-app-for-cross-platform-devices-logo-color-tal-revivo.png"
            alt="external-free-instant-messaging-app-for-cross-platform-devices-logo-color-tal-revivo"
          />
          {socialLoading ? "카카오로 이동 중…" : "카카오로 계속하기"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일"
        />
        <Input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md border border-neutral-300 bg-neutral-900 px-3 py-2 text-white disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-200 dark:text-neutral-900"
        >
          {loading ? "로그인 중…" : "로그인"}
        </button>
      </form>
    </div>
  );
}
