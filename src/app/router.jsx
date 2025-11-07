import AppShell from "@/app/shell/AppShell.jsx";
import HomePage from "@/pages/HomePage.jsx";
import MovieDetailPage from "@/pages/MovieDetailPage.jsx";
import SearchPage from "@/pages/SearchPage.jsx"; // ⬅️ 추가
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie/:id", element: <MovieDetailPage /> },
      { path: "search", element: <SearchPage /> }, // ⬅️ 추가
    ],
  },
]);
