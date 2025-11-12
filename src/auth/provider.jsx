// [3-3단계] 인증 상태를 관리하는 Provider 컴포넌트
import { useEffect, useState } from "react";
import { authClient } from "./client.js";
import { AuthCtx } from "./context.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let mounted = true;

    authClient.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      setBusy(false);
    });

    const {
      data: { subscription },
    } = authClient.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
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
