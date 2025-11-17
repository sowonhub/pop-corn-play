import { useEffect, useMemo, useState } from "react";
import { databaseAuthClient } from "./client.js";
import { DatabaseAuthContext } from "./context.js";

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

  const signUp = (email, password) =>
    databaseAuthClient.auth.signUp({ email, password });

  const logout = () => databaseAuthClient.auth.signOut();

  const contextValue = useMemo(
    () => ({
      user: databaseAuthUser,
      busy: databaseAuthLoading,
      login,
      signUp,
      logout,
    }),
    [databaseAuthUser, databaseAuthLoading],
  );

  return (
    <DatabaseAuthContext.Provider value={contextValue}>
      {children}
    </DatabaseAuthContext.Provider>
  );
}
