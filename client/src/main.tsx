import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  {
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
import ProtectedRoutes from './utils/ProtectedRoutes.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to="/register" replace />} path="/" />

          <Route element={<App />} path="/register">
            <Route index element={<Login />} />
          </Route>
          <Route element={<App />} path="/login">
            <Route index element={<Login />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route element={<Home />} path="/home" />
            <Route element={<Create />} path="/create" />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
