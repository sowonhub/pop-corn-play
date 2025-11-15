// [3-2단계] Auth Database 클라이언트 설정
import { ENV } from "@/config/env";
// 참고: createClient는 Auth Database 서비스를 위한 클라이언트를 생성합니다
// 실제 npm 패키지 이름은 변경할 수 없으므로 그대로 사용합니다
import { createClient } from "@supabase/supabase-js";

const isDev = import.meta.env.DEV;
const hasPlaceholder =
  ENV.AUTH_DATABASE.URL.includes("your_") ||
  ENV.AUTH_DATABASE.ANON_KEY.includes("your_");

// 개발 모드에서 placeholder 값이면 더미 URL로 클라이언트 생성
// (실제 API 호출은 실패하지만 앱이 크래시되지 않음)
const supabaseUrl =
  isDev && hasPlaceholder
    ? "https://placeholder.supabase.co"
    : ENV.AUTH_DATABASE.URL;
const supabaseKey =
  isDev && hasPlaceholder ? "placeholder-key" : ENV.AUTH_DATABASE.ANON_KEY;

export const authClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storage: localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
