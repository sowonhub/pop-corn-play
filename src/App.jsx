// [4단계] 앱의 메인 컴포넌트
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

export default function App() {
  return <RouterProvider router={router} />;
}

