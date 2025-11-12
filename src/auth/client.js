// [3-2단계] Auth Database 클라이언트 설정
import { ENV } from "@/config/env";
// 참고: createClient는 Auth Database 서비스를 위한 클라이언트를 생성합니다
// 실제 npm 패키지 이름은 변경할 수 없으므로 그대로 사용합니다
import { createClient } from "@supabase/supabase-js";

export const authClient = createClient(ENV.AUTH_DATABASE.URL, ENV.AUTH_DATABASE.ANON_KEY, {
  auth: {
    persistSession: true,
    storage: localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
