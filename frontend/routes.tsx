import MainLayout from 'Frontend/views/MainLayout.js';
import { SandboxView } from './views/SandboxView.js';
import { ComponentsView } from 'Frontend/views/ComponentsView/ComponentsView.js';
import { FormView } from 'Frontend/views/FormView.js';
import { ReactiveView } from 'Frontend/views/ReactiveView';
import { ChatView } from 'Frontend/views/ChatView.js';
import { GridView } from 'Frontend/views/GridView';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

type ViewRoute = RouteObject & {
  title: string;
  icon: string;
};

export const views: ViewRoute[] = [
  { path: '/', title: 'Components', icon: 'la-cubes', element: <ComponentsView /> },
  { path: '/forms', title: 'Form', icon: 'la-pen', element: <FormView /> },
  { path: '/grid', title: 'Grid', icon: 'la-th', element: <GridView /> },
  { path: '/reactive', title: 'Reactive', icon: 'la-bell', element: <ReactiveView /> },
  { path: '/chat', title: 'Chat', icon: 'la-comments', element: <ChatView /> },
  { path: '/sandbox', title: 'Sandbox', icon: 'la-code', element: <SandboxView /> }
];

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: views
  }
];

const router = createBrowserRouter(routes);
export default router;
