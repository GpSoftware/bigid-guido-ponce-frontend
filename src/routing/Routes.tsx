import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp } from '../pages/auth';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import { Organizations, Users, Articles, ArticleForm, Comments, CommentForm, Home, OrganizationForm, UserForm } from '../pages/protected';

const AUTH_ROUTES = [
  {
    path: '/',
    component: () => <SignIn />,
  },
  {
    path: '/signUp',
    component: () => <SignUp />,
  },
];

const APP_ROUTES = [
  {
    path: '/home',
    component: () => <Home />,
  },
  {
    path: '/organizations',
    component: () => <Organizations />,
  },
  {
    path: '/organizations/create',
    component: () => <OrganizationForm />,
  },
  {
    path: '/organizations/:id',
    component: () => <OrganizationForm isEdit />,
  },
  {
    path: '/users',
    component: () => <Users />,
  },
  {
    path: '/organizations/:organizationId/user/create',
    component: () => <UserForm />,
  },
  {
    path: '/users/:id',
    component: () => <UserForm isEdit />,
  },
  {
    path: '/articles',
    component: () => <Articles />,
  },
  {
    path: '/articles/create',
    component: () => <ArticleForm />,
  },
  {
    path: '/articles/:id',
    component: () => <ArticleForm isEdit />,
  },
  {
    path: '/comments',
    component: () => <Comments />,
  },
  {
    path: '/articles/:articleId/comment/create',
    component: () => <CommentForm />,
  },
  {
    path: '/comments/:id',
    component: () => <CommentForm isEdit />,
  },
  {
    path: '/logout',
    component: () => <Navigate to='/' replace />,
  },
];

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          {APP_ROUTES.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component />}
            />
          ))}
        </Route>

        <Route element={<PublicRoutes />}>
          {AUTH_ROUTES.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component />}
            />
          ))}
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoutes;
