import { Navigate, useLocation } from "react-router-dom";

import { useDatabaseAuth } from "@/auth";
import { PATHS } from "@/router";

export default function PublicRoute({ children }) {
  const location = useLocation();
  const { user, busy } = useDatabaseAuth();

  if (busy) {
    return <div className="p-6">로딩 중…</div>;
  }

  if (user) {
    return <Navigate to={PATHS.HOME} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
