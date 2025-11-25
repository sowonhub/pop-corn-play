import { createContext, useContext } from "react";

export const DatabaseAuthContext = createContext(null);

export const useDatabaseAuth = () => {
  const context = useContext(DatabaseAuthContext);
  if (context === null) {
    throw new Error(
      "useDatabaseAuth must be used within a DatabaseAuthProvider",
    );
  }
  return context;
};
