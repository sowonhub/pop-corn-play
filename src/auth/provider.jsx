import { useEffect, useState } from "react";
import { ENV } from "@/config/env";
import { authClient } from "./client.js";
import { AuthCtx } from "./context.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let mounted = true;

    const isDev = import.meta.env.DEV;
    const hasPlaceholder =
      ENV.AUTH_DATABASE.URL.includes("your_") ||
      ENV.AUTH_DATABASE.ANON_KEY.includes("your_");

    if (isDev && hasPlaceholder) {
      setUser(null);
      setBusy(false);
      return;
    }

    authClient.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      setBusy(false);
    }).catch(() => {
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
