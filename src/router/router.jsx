import Layout from "@/components/layout/Layout.jsx";
import DetailPage from "@/pages/DetailPage.jsx";
import HomePage from "@/pages/HomePage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import MyPage from "@/pages/MyPage.jsx";
import QueryPage from "@/pages/QueryPage.jsx";
import SignupPage from "@/pages/SignupPage.jsx";
import { createBrowserRouter } from "react-router-dom";
import RequireDatabaseAuth from "./RequireDatabaseAuth.jsx";

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
          // 인증절차를 거친 후 마이페이지를 보여줌
          <RequireDatabaseAuth>
            <MyPage />
          </RequireDatabaseAuth>
        ),
      },
    ],
  },
]);
