import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Layout } from "@/layout";

import MovieDetailPage from "@/pages/DetailPage.jsx";
import HomePage from "@/pages/HomePage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import SearchPage from "@/pages/QueryPage.jsx";
import SignupPage from "@/pages/SignupPage.jsx";

import {
  default as AuthProvider,
  default as useAuth,
} from "@/api/auth/AuthProvider.jsx";

export function RequireAuth({ children }) {
  const { user, busy } = useAuth();
  if (busy) return <div className="p-6">로딩 중…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "movie/:id", element: <MovieDetailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "mypage",
        element: <RequireAuth>{/* <MyPage /> */}</RequireAuth>,
      },
      {
        path: "*",
        element: <div className="p-6">페이지를 찾을 수 없어요.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
