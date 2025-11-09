import { supabase } from "@/lib/supabase.js";
import { useEffect, useState } from "react";
import { AuthCtx } from "./context.js";

// const AuthCtx = createContext(null);
// const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setUser(data.session?.user ?? null);
      } finally {
        if (mounted) setBusy(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const logout = () => supabase.auth.signOut();

  return (
    <AuthCtx.Provider value={{ user, busy, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
