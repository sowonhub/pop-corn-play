import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import { PublicRoute, RequireDatabaseAuth } from "@/router";

import DetailPage from "@/pages/DetailPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import MyPage from "@/pages/MyPage";
import SearchPage from "@/pages/SearchPage";
import SignupPage from "@/pages/SignupPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "movie/:id",
        element: <DetailPage />,
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        ),
      },
      {
        path: "mypage",
        element: (
          <RequireDatabaseAuth>
            <MyPage />
          </RequireDatabaseAuth>
        ),
      },
    ],
  },
]);
