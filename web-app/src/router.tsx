import { RouteObject, createBrowserRouter } from "react-router-dom";

import { DetailsModalPage } from "./pages/DetailsModalPage";
import { HomePage } from "./pages/HomePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/:id",
        element: <DetailsModalPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
