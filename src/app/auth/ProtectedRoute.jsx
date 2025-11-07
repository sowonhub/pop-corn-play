import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export default function ProtectedRoute() {
  const { isAuthed, busy } = useAuth();
  const loc = useLocation();
  if (busy) return null; // 로딩 스피너 필요시 여기에
  return isAuthed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: loc }} />
  );
}
