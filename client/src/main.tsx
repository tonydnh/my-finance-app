import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx'
import Connect from './components/Connect.tsx';
import Home from './components/Home.tsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", // This will render <Connect /> when at the base URL
        element: <Connect />,
      },
      {
        path: "home", // This will render <Home /> when at the "/home" URL
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
