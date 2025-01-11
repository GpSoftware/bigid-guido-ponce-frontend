import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import MainLayout from '../layout/MainLayout';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <MainLayout><Outlet /></MainLayout> : <Navigate to='/' replace />;
}

export default ProtectedRoutes;