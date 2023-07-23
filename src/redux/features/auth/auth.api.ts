import { IUser } from '@/interfaces';
import { BR, IError } from '@/redux/api/api.interface';
import { apiSlice } from '@/redux/api/api.slice';
import { setUser } from '../user/user.slice';
import { ILogin, ISignUp } from './auth.interface';
import { userLoggedIn } from './auth.slice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<BR<any>, ISignUp>({
      query: (data) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (baseQueryReturnValue: IError) =>
        baseQueryReturnValue.data.message,
    }),
    login: builder.mutation<BR<{ accessToken: string; user: IUser }>, ILogin>({
      query: (data) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem('auth', JSON.stringify(result.data.data));
          dispatch(userLoggedIn(result.data.data.accessToken));
          dispatch(
            setUser({
              id: result.data.data.user.id,
              email: result.data.data.user.email,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
      transformErrorResponse: (baseQueryReturnValue: IError) =>
        baseQueryReturnValue.data.message,
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
