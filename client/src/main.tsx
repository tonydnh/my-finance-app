import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './index.css';
import App from './App.tsx'
import Connect from './components/Connect.tsx';
import Home from './components/Home.tsx';
import Create from './components/Create.tsx';
import Login from './components/Login.tsx';
import LogInForm from './components/LogInForm.tsx';
import SignUpForm from './components/SignUpForm.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/register" replace />
  },
  {
    path: "/register",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ]
  },
  {
    path: "/login",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Navigate to="/register" replace />} path="/" />

        <Route element={<App />} path="/register">
          <Route index element={<Login />} />
        </Route>
        <Route element={<App />} path="/login">
          <Route index element={<Login />} />
        </Route>

        <Route element={<Home />} path="/home" />
        <Route element={<Create />} path="/create" />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
