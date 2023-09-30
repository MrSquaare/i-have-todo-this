import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";

import { queryClient } from "./api/client.ts";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
