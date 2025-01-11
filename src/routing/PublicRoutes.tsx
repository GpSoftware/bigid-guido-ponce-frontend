import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const PublicRoutes = () => {
    const { isLoggedIn } = useAuth();
    
    return isLoggedIn ? <Navigate to='/home' replace /> : <Outlet />;
}

export default PublicRoutes;