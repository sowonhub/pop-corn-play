// [3-3단계] 인증 상태를 관리하는 Provider 컴포넌트
import { useEffect, useState } from "react";
import { ENV } from "@/config/env";
import { authClient } from "./client.js";
import { AuthCtx } from "./context.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 개발 모드에서 placeholder 값이면 인증 기능을 건너뜀
    const isDev = import.meta.env.DEV;
    const hasPlaceholder =
      ENV.AUTH_DATABASE.URL.includes("your_") ||
      ENV.AUTH_DATABASE.ANON_KEY.includes("your_");

    if (isDev && hasPlaceholder) {
      // 개발 모드에서 placeholder 값이면 인증 없이 진행
      setUser(null);
      setBusy(false);
      return;
    }

    authClient.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      setBusy(false);
    }).catch(() => {
      // 에러 발생 시에도 앱이 계속 실행되도록
      if (!mounted) return;
      setUser(null);
      setBusy(false);
    });

    const {
      data: { subscription },
    } = authClient.auth.onAuthStateChange((_, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const login = (email, password) =>
    authClient.auth.signInWithPassword({ email, password });

  const signUp = (email, password) =>
    authClient.auth.signUp({ email, password });

  const logout = () => authClient.auth.signOut();

  return (
    <AuthCtx.Provider value={{ user, busy, login, signUp, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
