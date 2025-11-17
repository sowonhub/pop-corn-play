import { useState } from "react";
import { Link } from "react-router-dom";

import { useDatabaseAuth } from "@/auth";
import { Input } from "@/components/ui";

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
        "회원가입에 실패했습니다. 이메일을 바꾸거나 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isComplete) {
    return (
      <div className="mx-auto max-w-sm p-6">
        <h1 className="mb-3 text-xl font-semibold">회원가입 완료</h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          입력하신 주소로 <strong>인증 메일</strong>을 보냈어요. 메일함에서
          인증을 완료하신 후
          <span className="whitespace-nowrap"> "로그인" </span>해 주세요.
        </p>
        <Link to="/login" className="mt-4 inline-block text-sm underline">
          로그인 페이지로 이동
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="mb-4 text-xl font-semibold">회원가입</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <Input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 (8자 이상)"
        />
        <Input
          type="password"
          required
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호 확인"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>이용약관 및 개인정보 처리에 동의합니다.</span>
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-10 w-full items-center justify-center rounded-md border border-neutral-300 bg-neutral-900 text-white disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-200 dark:text-neutral-900"
        >
          {loading ? "가입 중…" : "회원가입"}
        </button>
      </form>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
