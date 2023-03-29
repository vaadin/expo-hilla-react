import { AppLayout } from "@hilla/react-components/AppLayout.js";
import { DrawerToggle } from "@hilla/react-components/DrawerToggle.js";
import Placeholder from "Frontend/components/placeholder/Placeholder.js";
import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function MenuOnLeftLayout() {
  return (
    <AppLayout className="h-full" primarySection="drawer">
      <div className="p-m" slot="drawer">
        <h1 className="text-l m-0">Hilla+React</h1>

        <ul className="list-none px-0">
          <li>
            <NavLink to="/">CRUD</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/sandbox">Sandbox</NavLink>
          </li>
        </ul>
      </div>

      <div slot="navbar">
        <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      </div>

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
