import { useAuth } from "@/auth";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user, busy } = useAuth();

  if (busy) return <div className="p-6">로딩 중…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
