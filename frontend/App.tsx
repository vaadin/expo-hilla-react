import { createContext, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes.js';

const ViewTitleContext = createContext('');

export function App() {
  const [viewTitle, setViewTitle] = useState('');

  return <RouterProvider router={router} />;
}
