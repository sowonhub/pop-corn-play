/**
 * [10단계] pages/LoginPage.jsx - 로그인 페이지 컴포넌트
 * 
 * 이 페이지는:
 * 1. 이메일과 비밀번호를 입력받습니다
 * 2. 로그인 버튼을 클릭하면 인증을 시도합니다
 * 3. 성공하면 이전 페이지로 돌아가거나 홈으로 이동합니다
 * 
 * 실행 순서:
 * - URL이 "/login"일 때 router.jsx에서 이 컴포넌트를 보여줍니다
 * - 또는 RequireAuth에서 로그인이 필요할 때 리다이렉트됩니다
 */

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/auth";
import { Input } from "@/components/ui";
export default function LoginPage() {
  // useAuth: 인증 관련 기능을 사용하기 위한 훅
  const { login } = useAuth();
  
  // useNavigate: 페이지 이동을 위한 훅
  const navigate = useNavigate();
  
  // useLocation: 현재 위치 정보를 가져오는 훅
  // 로그인 전에 어느 페이지에 있었는지 기억해서 로그인 후 그곳으로 돌아감
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? "/"; // 이전 페이지 또는 홈

  // 상태 관리: 입력값과 에러, 로딩 상태
  const [email, setEmail] = useState(""); // 이메일 입력값
  const [password, setPassword] = useState(""); // 비밀번호 입력값
  const [error, setError] = useState(""); // 에러 메시지
  const [loading, setLoading] = useState(false); // 로딩 중인지 여부

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작(페이지 새로고침) 방지
    setError(""); // 에러 초기화
    setLoading(true); // 로딩 시작

    try {
      // 로그인 시도
      const { error } = await login(email, password);
      if (error) throw error; // 에러가 있으면 catch로 이동
      
      // 로그인 성공 → 이전 페이지로 이동
      navigate(redirectTo, { replace: true });
    } catch {
      // 로그인 실패 → 에러 메시지 표시
      setError("이메일 또는 비밀번호를 확인해 주세요.");
    } finally {
      // 성공/실패 상관없이 로딩 종료
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
