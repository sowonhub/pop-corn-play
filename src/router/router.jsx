import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import RequireDatabaseAuth from "@/router/RequireDatabaseAuth";

// Lazy load pages
const DetailPage = lazy(() => import("@/pages/DetailPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const MyPage = lazy(() => import("@/pages/MyPage"));
const QueryPage = lazy(() => import("@/pages/QueryPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));

// Loading Fallback
function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-rose-500 dark:border-neutral-800" />
    </div>
  );
}

function withSuspense(Component) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: "search", element: withSuspense(QueryPage) },
      { path: "movie/:id", element: withSuspense(DetailPage) },
      { path: "login", element: withSuspense(LoginPage) },
      { path: "signup", element: withSuspense(SignupPage) },
      {
        path: "mypage",
        element: (
          <RequireDatabaseAuth>{withSuspense(MyPage)}</RequireDatabaseAuth>
        ),
      },
    ],
  },
]);
