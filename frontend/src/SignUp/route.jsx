import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useAuth = () => {
  const isAuthenticated = Cookies.get('auth');
  return isAuthenticated;
};
const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoute;
