import AppShell from "@/app/shell/AppShell.jsx";
import HomePage from "@/pages/HomePage.jsx";
import MovieDetailPage from "@/pages/MovieDetailPage.jsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie/:id", element: <MovieDetailPage /> },
    ],
  },
]);
