// [3-1단계] 인증 Context 정의
import { createContext, useContext } from "react";

export const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);
