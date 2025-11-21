import kakaoLogo from "@/assets/logo/kakao-logo.svg";
import { useDatabaseAuth } from "@/auth";
import { Button, Input } from "@/components/ui";
import { PATHS } from "@/router";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 pt-20 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            로그인
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            서비스 이용을 위해 로그인이 필요합니다.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-3">
            <Button
              type="button"
              onClick={handleKakaoLogin}
              disabled={socialLoading}
              className="flex w-full items-center justify-center gap-2 border-none bg-[#FEE500] text-[#000000] hover:bg-[#FDD835] focus:ring-yellow-500"
            >
              <img src={kakaoLogo} alt="Kakao Logo" className="h-5 w-5" />
              <span>
                {socialLoading ? "카카오 로그인 중..." : "카카오로 시작하기"}
              </span>
            </Button>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={socialLoading}
              className="flex w-full items-center justify-center gap-2 border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-100"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>
                {socialLoading ? "구글 로그인 중..." : "구글로 시작하기"}
              </span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                또는 이메일로 로그인
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="이메일 주소"
                className="block w-full"
              />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호"
                className="block w-full"
              />
            </div>

            {error && (
              <div className="text-center text-sm font-medium text-red-500">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-neutral-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                {loading ? "로그인 중..." : "로그인"}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            계정이 없으신가요?{" "}
            <Link
              to={PATHS.SIGNUP}
              className="font-medium text-neutral-900 hover:text-neutral-800 dark:text-white dark:hover:text-neutral-200"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
