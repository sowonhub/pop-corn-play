// [5-3단계] 인증이 필요한 페이지를 보호하는 컴포넌트
import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth";

export default function RequireAuth({ children }) {
  const { user, busy } = useAuth();

  if (busy) return <div className="p-6">로딩 중…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
