import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { createContext, Suspense, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const TitleContext = createContext((title: string) =>
  console.warn('No title provider')
);

export default function MainLayout() {
  const [title, setTitle] = useState('');

  return (
    <AppLayout className="h-full" primarySection="drawer">
      <div className="p-m" slot="drawer">
        <h2 className="text-l m-0">Hilla+React</h2>

        <ul className="list-none px-0 text-secondary">
          <li>
            <NavLink to="/" className="flex gap-s items-center">
              <i className="la la-columns"></i>
              CRUD
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="flex gap-s items-center">
              <i className="la la-chart-area"></i>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/map" className="flex gap-s items-center">
              <i className="la la-map"></i>
              Map
            </NavLink>
          </li>
          <li>
            <NavLink to="/sandbox" className="flex gap-s items-center">
              <i className="la la-glasses"></i>
              Sandbox
            </NavLink>
          </li>
        </ul>
      </div>

      <div slot="navbar" className="flex gap-m items-center">
        <DrawerToggle aria-label="Menu toggle"></DrawerToggle>
        <h1 className="text-l m-0">{title}</h1>
      </div>

      <TitleContext.Provider value={setTitle}>
        <Suspense fallback={<Placeholder />}>
          <Outlet />
        </Suspense>
      </TitleContext.Provider>
    </AppLayout>
  );
}
