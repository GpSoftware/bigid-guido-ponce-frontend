import './sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../config/paths';
import { useAuth } from '../../providers/AuthProvider';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  
  return (
    <nav className='sidebar'>
      <img className='logo' src="big-id.png" />
      <div className='content'>
        {
          PATHS.map(({ label, path }, idx) => (
            <Link key={idx} to={path} className={location.pathname.startsWith(path) ? 'active' : ''}>{label}</Link>
          ))
        }
        <button onClick={logout}>Sign Out</button>
      </div>
    </nav>
  );
};

export default Sidebar;