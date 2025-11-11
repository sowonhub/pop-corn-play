/**
 * [5-3단계] router/RequireAuth.jsx - 인증이 필요한 페이지를 보호하는 컴포넌트
 * 
 * 이 컴포넌트는:
 * 1. 로그인 상태를 확인합니다
 * 2. 로그인하지 않았으면 로그인 페이지로 리다이렉트합니다
 * 3. 로그인했으면 children(자식 컴포넌트)를 보여줍니다
 * 
 * 실행 순서:
 * - "/mypage" 같은 보호된 경로에 접근할 때 실행됩니다
 * 
 * 사용 예시:
 * <RequireAuth>
 *   <MyPage />
 * </RequireAuth>
 * 
 * @param {ReactNode} children - 로그인이 필요한 컴포넌트
 */
export default function RequireAuth({ children }) {
  const { user, busy } = useAuth();

  // 초기 로딩 중이면 로딩 메시지 표시
  if (busy) return <div className="p-6">로딩 중…</div>;
  
  // 로그인하지 않았으면 로그인 페이지로 이동
  if (!user) return <Navigate to="/login" replace />;
  
  // 로그인했으면 자식 컴포넌트 보여주기
  return children;
}
