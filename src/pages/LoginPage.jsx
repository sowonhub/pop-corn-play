import { useAuth } from "@/app/auth/AuthProvider.jsx";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname ?? "/";

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { error } = await login(email, pw);
      if (error) throw error;
      nav(from, { replace: true });
    } catch {
      setErr("이메일 또는 비밀번호를 확인해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="mb-4 text-xl font-semibold">로그인</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          id="loginbox"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="w-full rounded-md border border-neutral-300 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
        />
        <input
          id="passwordbox"
          type="password"
          required
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호"
          className="w-full rounded-md border border-neutral-300 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
        />
        {err && <p className="text-sm text-red-500">{err}</p>}
        <button
          disabled={loading}
          className="w-full rounded-md border border-neutral-300 bg-neutral-900 px-3 py-2 text-white disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-200 dark:text-neutral-900"
        >
          {loading ? "로그인 중…" : "로그인"}
        </button>
      </form>
    </div>
  );
}
