/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { userLoggedIn } from '@/redux/features/auth/auth.slice';
import { setUser } from '@/redux/features/user/user.slice';
import { useAppDispatch } from '@/redux/hook';
import { useEffect, useState } from 'react';

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const localAuth = localStorage.getItem('auth');
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.user && auth?.accessToken) {
        dispatch(userLoggedIn(auth.accessToken));
        dispatch(setUser(auth.user));
      }
    }
    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
};
