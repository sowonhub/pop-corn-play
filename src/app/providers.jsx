import AuthProvider from "@/app/auth/AuthProvider.jsx";

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
