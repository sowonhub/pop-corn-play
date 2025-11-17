import { createContext, useContext } from "react";

export const DatabaseAuthContext = createContext(null);
export const useDatabaseAuth = () => useContext(DatabaseAuthContext);
