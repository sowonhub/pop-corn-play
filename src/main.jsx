/**
 * [2단계] main.jsx - 앱의 진입점 (Entry Point)
 * 
 * 이 파일이 실행되면:
 * 1. CSS 스타일을 로드합니다
 * 2. React를 초기화합니다
 * 3. AuthProvider와 App을 렌더링합니다
 * 
 * 다음 단계: [3단계] auth/provider.jsx → [4단계] App.jsx
 */

// CSS 스타일 가져오기
import "./index.css";

// React 라이브러리 가져오기
import React from "react";
import ReactDOM from "react-dom/client";

// 우리가 만든 컴포넌트들 가져오기
import App from "./App.jsx";
import { AuthProvider } from "./auth";

// 앱을 화면에 그리기 (렌더링)
// ReactDOM.createRoot: React 18의 새로운 렌더링 방식
// document.getElementById("root"): index.html의 <div id="root">를 찾아서 그곳에 앱을 그립니다
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode: 개발 중 잠재적인 문제를 찾아주는 모드
  <React.StrictMode>
    {/* AuthProvider: 로그인 상태를 관리하는 Provider (전체 앱을 감싸서 어디서든 로그인 상태 사용 가능) */}
    <AuthProvider>
      {/* App: 메인 앱 컴포넌트 (라우터 설정이 들어있음) */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
