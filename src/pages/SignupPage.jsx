import { useAuth } from "@/app/auth/context.js";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!agree) return setErr("약관에 동의해 주세요.");
    if (pw !== pw2) return setErr("비밀번호가 일치하지 않습니다.");
    if (pw.length < 8) return setErr("비밀번호는 8자 이상이어야 합니다.");

    setLoading(true);
    try {
      const { error } = await signUp(email, pw);
      if (error) throw error;
      setDone(true); // 인증 메일 안내 상태로 전환
    } catch {
      setErr(
        "회원가입에 실패했습니다. 이메일을 바꾸거나 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-sm p-6">
        <h1 className="mb-3 text-xl font-semibold">회원가입 완료</h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          입력하신 주소로 <strong>인증 메일</strong>을 보냈어요. 메일함에서
          인증을 완료하신 후
          <span className="whitespace-nowrap"> “로그인” </span>해 주세요.
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
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="w-full rounded-md border border-neutral-300 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
        />
        <input
          type="password"
          required
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호 (8자 이상)"
          className="w-full rounded-md border border-neutral-300 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
        />
        <input
          type="password"
          required
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          placeholder="비밀번호 확인"
          className="w-full rounded-md border border-neutral-300 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>이용약관 및 개인정보 처리에 동의합니다.</span>
        </label>
        {err && <p className="text-sm text-red-500">{err}</p>}
        <button
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
