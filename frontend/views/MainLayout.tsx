import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { views } from 'Frontend/routes.js';
import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Checkbox } from '@hilla/react-components/Checkbox.js';

export default function MainLayout() {
  const location = useLocation();
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => toggleTheme(darkTheme), [darkTheme]);

  function toggleTheme(dark: boolean) {
    document.documentElement.setAttribute('theme', dark ? 'dark' : 'light');
  }

  return (
    <AppLayout className='h-full' primarySection='drawer'>
      <div className='flex flex-col h-full' slot='drawer'>
        <h1 className='text-2xl px-l pt-l pb-0'>Hilla</h1>

        <ul className='list-none px-0 text-secondary font-medium flex-grow'>
          {views.map((view) => (
            <li key={view.path}>
              <NavLink to={view.path!} className='flex gap-s items-center'>
                <i className={`la ${view.icon} text-xl`}></i>
                {view.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <Checkbox label='Dark theme'
                  className='justify-end p-m'
                  checked={darkTheme}
                  onCheckedChanged={e => setDarkTheme(e.detail.value)} />
      </div>

      <div slot='navbar' className='flex gap-m items-center'>
        <DrawerToggle aria-label='Menu toggle' className='text-secondary'></DrawerToggle>
        <h1 className='text-l m-0'>
          {views.find((v) => v.path === location.pathname)?.title || ''}
        </h1>
      </div>

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
