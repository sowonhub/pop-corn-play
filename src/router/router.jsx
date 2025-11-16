import { Layout } from "@/components/layout";
import DetailPage from "@/pages/DetailPage.jsx";
import HomePage from "@/pages/HomePage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import MyPage from "@/pages/MyPage.jsx";
import QueryPage from "@/pages/QueryPage.jsx";
import SignupPage from "@/pages/SignupPage.jsx";
import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./RequireAuth.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <QueryPage /> },
      { path: "movie/:id", element: <DetailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "mypage",
        element: (
          <RequireAuth>
            <MyPage />
          </RequireAuth>
        ),
      },
      {
        path: "*",
        element: <div className="p-6">페이지를 찾을 수 없어요.</div>,
      },
    ],
  },
]);
