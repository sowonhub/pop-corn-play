import { AuthCtx } from "@/Context.js";
import { useEffect, useState } from "react";
import { SUPABASE } from "./SUPABASE.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await SUPABASE.auth.getSession();
        if (!mounted) return;
        setUser(data.session?.user ?? null);
      } finally {
        if (mounted) setBusy(false);
      }
    })();

    const { data: sub } = SUPABASE.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = (email, password) =>
    SUPABASE.auth.signInWithPassword({ email, password });

  const logout = () => SUPABASE.auth.signOut();

  return (
    <AuthCtx.Provider value={{ user, busy, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
