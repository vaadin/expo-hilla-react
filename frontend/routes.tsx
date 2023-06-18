import MainLayout from 'Frontend/views/MainLayout.js';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { CrudView } from './views/CrudView.js';
import { SandboxView } from './views/SandboxView.js';
import { ComponentsView } from 'Frontend/views/ComponentsView/ComponentsView.js';
import { LayoutsView } from 'Frontend/views/LayoutsView.js';
import { EventsView } from 'Frontend/views/EventsView.js';
import { FormView } from 'Frontend/views/FormView.js';
import { ReactiveView } from 'Frontend/views/ReactiveView';
import { ChatView } from 'Frontend/views/ChatView.js';

type ViewRoute = RouteObject & {
  title: string;
  icon: string;
};

export const views: ViewRoute[] = [
  { path: '/', title: 'Components', icon: 'la-cubes', element: <ComponentsView /> },
  { path: '/layouts', title: 'Layouts', icon: 'la-columns', element: <LayoutsView /> },
  { path: '/events', title: 'Events', icon: 'la-calendar', element: <EventsView /> },
  { path: '/forms', title: 'Form', icon: 'la-pen', element: <FormView /> },
  { path: '/grid', title: 'Grid', icon: 'la-th', element: <CrudView /> },
  { path: '/reactive', title: 'Reactive', icon: 'la-bell', element: <ReactiveView /> },
  { path: '/chat', title: 'Chat', icon: 'la-comments', element: <ChatView /> },
  { path: '/sandbox', title: 'Sandbox', icon: 'la-code', element: <SandboxView /> },
];

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: views,
  },
];

const router = createBrowserRouter(routes);
export default router;
