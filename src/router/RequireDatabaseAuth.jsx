import { useDatabaseAuth } from "@/auth";

// Provider.jsx > DatabaseAuthContext.Provider > contextValue
// 컴포넌트 렌더링 전 인증 절차를 거친 후 마이페이지를 보여줌
export default function RequireDatabaseAuth({ children }) {
  const { user: databaseAuthUser, busy: databaseAuthBusy } = useDatabaseAuth();

  if (databaseAuthBusy || !databaseAuthUser)
    return <div className="p-6">로딩 중…</div>;
  return <>{children}</>;
}
