import { RouterProvider } from 'react-router-dom';
import router from './routes.js';

export function App() {
  return <RouterProvider router={router} />;
}
