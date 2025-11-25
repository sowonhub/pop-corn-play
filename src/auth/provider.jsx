import { databaseAuthClient } from "@/services/database-auth/client";
import { DatabaseAuthContext } from "@/auth/context";
import { useEffect, useMemo, useState } from "react";

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

  const logout = () => databaseAuthClient.auth.signOut();

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
    <DatabaseAuthContext value={contextValue}>{children}</DatabaseAuthContext>
  );
}
