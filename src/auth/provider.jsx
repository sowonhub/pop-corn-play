import { databaseAuthClient } from "@/services/database-auth/client";
import { DatabaseAuthContext } from "@/auth/context";
import { useEffect, useMemo, useState } from "react";

const clearLocalSession = () => {
  try {
    const projectRef =
      new URL(databaseAuthClient?.supabaseUrl ?? "").hostname.split(".")[0];
    const prefixes = projectRef
      ? [`sb-${projectRef}-auth-token`, `sb-${projectRef}-auth-token.local`]
      : ["sb-"];
    Object.keys(localStorage)
      .filter((key) => prefixes.some((prefix) => key.startsWith(prefix)))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    // Best-effort cleanup; ignore errors
  }
};

export default function DatabaseAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const {
        data: { session },
      } = await databaseAuthClient.auth.getSession();
      if (!isMounted) return;
      setUser(session?.user ?? null);
      setBusy(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = databaseAuthClient.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      setBusy(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = (email, password) =>
    databaseAuthClient.auth.signInWithPassword({ email, password });

  const signUp = (email, password) =>
    databaseAuthClient.auth.signUp({ email, password });

  const signInWithProvider = (provider, options) =>
    databaseAuthClient.auth.signInWithOAuth({ provider, options });

  const logout = async () => {
    setBusy(true);
    try {
      const { error } = await databaseAuthClient.auth.signOut({
        scope: "local",
      });
      if (error) {
        console.error("Logout failed:", error);
      }
      clearLocalSession();
      setUser(null);
    } finally {
      setBusy(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      busy,
      login,
      signUp,
      signInWithProvider,
      logout,
    }),
    [user, busy],
  );

  return (
    <DatabaseAuthContext.Provider value={contextValue}>
      {children}
    </DatabaseAuthContext.Provider>
  );
}
