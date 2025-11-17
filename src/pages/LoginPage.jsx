import { useDatabaseAuth } from "@/auth";
import { Input } from "@/components/ui";
import { PATHS } from "@/router";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useDatabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? PATHS.HOME;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="mb-4 text-xl font-semibold">로그인</h1>
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
