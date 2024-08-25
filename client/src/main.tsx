import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx'
import Connect from './components/Connect.tsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        
      },
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
