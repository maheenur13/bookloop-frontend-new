import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const isLoggedIn = useAuth();

  const location = useLocation();

  console.log({ location });

  return !isLoggedIn ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    children
  );
}
