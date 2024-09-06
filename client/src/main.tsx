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
import { UserDataProvider } from './contexts/UserDataContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <UserDataProvider> {/* Under BrowserRouter rather than out because useNavigate is used */}
          <Routes>
            <Route element={<Navigate to="/register" replace />} path="/" />

            <Route element={<App />} path="/register">
              <Route index element={<Login />} />
            </Route>
            <Route element={<App />} path="/login">
              <Route index element={<Login />} />
            </Route>
            
            {/* Wrap in Route with App component to allow Navbar to be shown*/}
            <Route element={<App />}> 
              <Route element={<ProtectedRoutes />}>
                <Route element={<Connect />} path="/connect" />
                <Route element={<Home />} path="/home" />
                <Route element={<Create />} path="/create" />
              </Route>
            </Route>
          </Routes>
        </UserDataProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
