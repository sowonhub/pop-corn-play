/**
 * [3-2단계] auth/supabase.js - Supabase 클라이언트 설정
 * 
 * Supabase는 백엔드 서비스입니다 (데이터베이스, 인증 등).
 * 이 파일은 Supabase와 연결하는 클라이언트를 만듭니다.
 * 
 * 다음 단계: [3-3단계] auth/provider.jsx
 */

import { createClient } from "@supabase/supabase-js";

// 환경 변수에서 Supabase 설정 가져오기
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 환경 변수가 없으면 에러 발생
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

// Supabase 클라이언트 생성 및 export
export const SUPABASE = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true, // 세션을 저장해서 새로고침해도 로그인 유지
    storage: localStorage, // localStorage에 저장
    autoRefreshToken: true, // 토큰 자동 갱신
    detectSessionInUrl: true, // URL에서 세션 감지
  },
});

