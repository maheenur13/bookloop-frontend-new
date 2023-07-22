import Books from '@/components/Books';
import { MainLayout } from '@/components/layouts/MainLayout';
import { AddBook } from '@/pages/AddBook';
import { BookDetails } from '@/pages/BookDetails';
import { EditBook } from '@/pages/EditBook';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Signup from '@/pages/Signup';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

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
    path: '/add-book',
    element: (
      <MainLayout>
        <PrivateRoute>
          <AddBook />
        </PrivateRoute>
      </MainLayout>
    ),
  },
  {
    path: '/book/edit/:id',
    element: (
      <MainLayout>
        <PrivateRoute>
          <EditBook />
        </PrivateRoute>
      </MainLayout>
    ),
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
        {/* <PrivateRoute> */}
        <Books page="all-books" />
        {/* </PrivateRoute> */}
      </MainLayout>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
