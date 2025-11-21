import App from "@/App";
import DatabaseAuthProvider from "@/auth/provider";
import { ThemeProvider } from "@/context/ThemeContext";
import "@/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DatabaseAuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </DatabaseAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
