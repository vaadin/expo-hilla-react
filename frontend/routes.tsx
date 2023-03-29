import MainLayout from "Frontend/views/MainLayout.js";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { CrudView } from "./views/CrudView";
import { DashboardView } from "./views/DashboardView";
import { SandboxView } from "./views/SandboxView";

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <CrudView /> },
      { path: "/dashboard", element: <DashboardView /> },
      { path: "/sandbox", element: <SandboxView /> },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
