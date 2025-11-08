import ProtectedRoute from "@/app/auth/ProtectedRoute.jsx";
import AppShell from "@/app/shell/AppShell.jsx";
import HomePage from "@/pages/HomePage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import MovieDetailPage from "@/pages/MovieDetailPage.jsx";
import SearchPage from "@/pages/SearchPage.jsx";
import SignupPage from "@/pages/SignupPage.jsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie/:id", element: <MovieDetailPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <div className="p-6">프로필(예시 보호)</div>,
          },
        ],
      },
    ],
  },
]);
