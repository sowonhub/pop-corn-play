/**
 * [3-3단계] auth/provider.jsx - 인증 상태를 관리하는 Provider 컴포넌트
 * 
 * 이 컴포넌트는:
 * 1. 로그인 상태를 관리합니다 (user: 로그인한 사용자 정보)
 * 2. 로그인/회원가입/로그아웃 기능을 제공합니다
 * 3. Context를 통해 전체 앱에서 인증 상태를 사용할 수 있게 합니다
 * 
 * 실행 순서:
 * - main.jsx에서 이 컴포넌트가 실행됩니다
 * - 전체 앱을 감싸서 어디서든 로그인 상태를 사용할 수 있게 합니다
 * 
 * 다음 단계: [4단계] App.jsx
 * 
 * @param {ReactNode} children - 이 Provider 안에 들어갈 컴포넌트들
 */

import { useEffect, useState } from "react";
import { AuthCtx } from "./context.js";
import { SUPABASE } from "./supabase.js";

export default function AuthProvider({ children }) {
  // 상태 관리
  const [user, setUser] = useState(null); // 로그인한 사용자 정보 (null이면 로그인 안함)
  const [busy, setBusy] = useState(true); // 초기 로딩 중인지 여부

  // 컴포넌트가 처음 렌더링될 때 실행
  useEffect(() => {
    let mounted = true; // 컴포넌트가 아직 마운트되어 있는지 확인하는 플래그

    // 1. 현재 세션(로그인 상태) 확인
    SUPABASE.auth.getSession().then(({ data }) => {
      // 컴포넌트가 사라지지 않았으면 사용자 정보 저장
      if (!mounted) return;
      setUser(data.session?.user ?? null); // 사용자 정보가 있으면 저장, 없으면 null
      setBusy(false); // 로딩 완료
    });

    // 2. 로그인 상태가 변경될 때마다 실행되는 리스너 등록
    // (예: 로그인하면 user가 설정되고, 로그아웃하면 user가 null이 됨)
    const {
      data: { subscription },
    } = SUPABASE.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    // cleanup: 컴포넌트가 사라질 때 리스너 제거 (메모리 누수 방지)
    return () => {
      mounted = false;
      subscription.unsubscribe(); // 리스너 구독 해제
    };
  }, []); // 빈 배열: 컴포넌트가 처음 마운트될 때만 실행

  // 로그인 함수
  const login = (email, password) =>
    SUPABASE.auth.signInWithPassword({ email, password });

  // 회원가입 함수
  const signUp = (email, password) => SUPABASE.auth.signUp({ email, password });

  // 로그아웃 함수
  const logout = () => SUPABASE.auth.signOut();

  // Context Provider로 감싸서 전체 앱에서 인증 관련 기능 사용 가능하게 함
  return (
    <AuthCtx.Provider value={{ user, busy, login, signUp, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
