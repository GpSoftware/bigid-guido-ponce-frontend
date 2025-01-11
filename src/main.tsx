import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './routing/Routes';
import { AuthProvider } from './providers/AuthProvider';
import ReactQueryProvider from './providers/ReactQueryProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ReactQueryProvider>
        <Routes />
      </ReactQueryProvider>
    </AuthProvider>
  </StrictMode>,
)
