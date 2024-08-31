import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/register", "/login"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      {!shouldHideNavbar &&  <Navbar />}
      <Outlet />
    </div>
  )
}