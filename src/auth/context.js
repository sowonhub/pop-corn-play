/**
 * [3-1단계] auth/context.js - 인증 Context 정의
 * 
 * Context API를 사용해서 전역 상태를 관리합니다.
 * 이 파일은 Context를 정의만 하고, 실제 사용은 provider.jsx에서 합니다.
 * 
 * 다음 단계: [3-2단계] auth/supabase.js
 */

import { createContext, useContext } from "react";

// Context 생성: 인증 상태를 저장할 공간
export const AuthCtx = createContext(null);

// Context를 쉽게 사용하기 위한 훅
export const useAuth = () => useContext(AuthCtx);

