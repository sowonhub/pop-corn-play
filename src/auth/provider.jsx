import { databaseAuthClient } from "@/auth/client";
import { DatabaseAuthContext } from "@/auth/context";
import { useEffect, useMemo, useState } from "react";

const EVENTS = {
  SIGNED_IN: "SIGNED_IN",
  SIGNED_OUT: "SIGNED_OUT",
};

export default function DatabaseAuthProvider({ children }) {
  const [databaseAuthUser, setDatabaseAuthUser] = useState(null);
  const [databaseAuthLoading, setDatabaseAuthLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = databaseAuthClient.auth.onAuthStateChange((authEvent, authSession) => {
      if (authEvent === EVENTS.SIGNED_IN) {
        setDatabaseAuthUser(authSession.user);
      } else if (authEvent === EVENTS.SIGNED_OUT) {
        setDatabaseAuthUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
      setDatabaseAuthLoading(false);
    };
  }, []);

  const login = (email, password) =>
    databaseAuthClient.auth.signInWithPassword({ email, password });

  // 정보 저장 되는 곳은 databaseAuthUser에 저장됨
  const signUp = (email, password) =>
    databaseAuthClient.auth.signUp({ email, password });

  const signInWithProvider = (provider, options) =>
    databaseAuthClient.auth.signInWithOAuth({ provider, options });

  const logout = () => databaseAuthClient.auth.signOut();

  const contextValue = useMemo(
    () => ({
      user: databaseAuthUser,
      busy: databaseAuthLoading,
      login,
      signUp,
      signInWithProvider,
      logout,
    }),
    [databaseAuthUser, databaseAuthLoading],
  );

  return (
    <DatabaseAuthContext value={contextValue}>{children}</DatabaseAuthContext>
  );
}
