import MainLayout from 'Frontend/views/MainLayout.js';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { CrudView } from './views/CrudView.js';
import { DashboardView } from './views/DashboardView.js';
import { MapView } from './views/MapView.js';
import { SandboxView } from './views/SandboxView.js';

type ViewRoute = RouteObject & {
  title: string;
  icon: string;
};

export const views: ViewRoute[] = [
  { path: '/', title: 'CRUD', icon: 'la-columns', element: <CrudView /> },
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'la-chart-area',
    element: <DashboardView />,
  },
  { path: '/map', title: 'Map', icon: 'la-map', element: <MapView /> },
  {
    path: '/sandbox',
    title: 'Sandbox',
    icon: 'la-glasses',
    element: <SandboxView />,
  },
];

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: views,
  },
];

const router = createBrowserRouter(routes);
export default router;
