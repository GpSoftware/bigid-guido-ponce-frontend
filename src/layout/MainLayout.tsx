import './layout.css';

import { FC, ReactNode } from 'react';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='layout'>
      <Sidebar />
      <div className='page-content'>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;