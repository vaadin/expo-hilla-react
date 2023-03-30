import MainLayout from 'Frontend/views/MainLayout.js';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { CrudView } from './views/CrudView.js';
import { DashboardView } from './views/DashboardView.js';
import { SandboxView } from './views/SandboxView.js';

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <CrudView /> },
      { path: '/dashboard', element: <DashboardView /> },
      { path: '/sandbox', element: <SandboxView /> },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
