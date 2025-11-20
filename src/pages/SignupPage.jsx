import { useState } from "react";
import { Link } from "react-router-dom";

import { useDatabaseAuth } from "@/auth";
import { Button, Input } from "@/components/ui";
import { PATHS } from "@/router";

export default function SignupPage() {
  const { signUp } = useDatabaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!agree) {
      setError("약관에 동의해 주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(email, password);
      if (error) throw error;
      setIsComplete(true);
    } catch {
      setError(
        "회원가입에 실패했습니다." +
          "\n" +
          "이메일을 바꾸거나 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isComplete) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-800">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              회원가입 완료
            </h2>
            <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              <p>
                입력하신 주소로 <strong>인증 메일</strong>을 보냈어요.
              </p>
              <p className="mt-1">
                메일함에서 인증을 완료하신 후 로그인해 주세요.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link to={PATHS.LOGIN}>
              <Button className="w-full justify-center bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100">
                로그인 페이지로 이동
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            회원가입
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            새로운 계정을 만들어 서비스를 이용해보세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              className="block w-full"
            />
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 (8자 이상)"
              className="block w-full"
            />
            <Input
              type="password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호 확인"
              className="block w-full"
            />
          </div>

          <div className="flex items-center">
            <input
              id="agree-checkbox"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800"
            />
            <label
              htmlFor="agree-checkbox"
              className="ml-2 block text-sm text-neutral-900 dark:text-neutral-300"
            >
              이용약관 및 개인정보 처리에 동의합니다.
            </label>
          </div>

          {error && (
            <div className="text-center text-sm font-medium whitespace-pre-line text-red-500">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-neutral-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          >
            {loading ? "가입 중…" : "회원가입"}
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          이미 계정이 있으신가요?{" "}
          <Link
            to={PATHS.LOGIN}
            className="font-medium text-neutral-900 hover:text-neutral-800 dark:text-white dark:hover:text-neutral-200"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
