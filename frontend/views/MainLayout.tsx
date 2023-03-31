import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { views } from 'Frontend/routes.js';
import { Suspense } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function MainLayout() {
  const location = useLocation();

  return (
    <AppLayout className="h-full" primarySection="drawer">
      <div className="p-m" slot="drawer">
        <h2 className="text-l m-0">Hilla+React</h2>

        <ul className="list-none px-0 text-secondary font-medium">
          {views.map((view) => (
            <li key={view.path}>
              <NavLink to={view.path!} className="flex gap-s items-center">
                <i className={`la ${view.icon}`}></i>
                {view.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div slot="navbar" className="flex gap-m items-center">
        <DrawerToggle aria-label="Menu toggle"></DrawerToggle>
        <h1 className="text-l m-0">
          {views.find((v) => v.path === location.pathname)?.title || ''}
        </h1>
      </div>

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
