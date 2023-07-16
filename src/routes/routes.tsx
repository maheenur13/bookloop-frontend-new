
import Books from '@/components/Books';
import { MainLayout } from '@/components/layouts/MainLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Signup from '@/pages/Signup';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { BookDetails } from '@/pages/BookDetails';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <Signup />,
  },
  {
    path: '/book/details/:id',
    element: (
      <MainLayout>
        <BookDetails />
      </MainLayout>
    ),
  },
  {
    path: '/all-books',
    element: (
      <MainLayout>
        <PrivateRoute>
          <Books />
        </PrivateRoute>
      </MainLayout>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
