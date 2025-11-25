import { useDatabaseAuth } from "@/auth";
export default function RequireDatabaseAuth({ children }) {
  const { user: databaseAuthUser, busy: databaseAuthBusy } = useDatabaseAuth();

  if (databaseAuthBusy || !databaseAuthUser)
    return <div className="p-6">로딩 중…</div>;
  return <>{children}</>;
}
