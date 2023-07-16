/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
    // eslint-disable-next-line @typescript-eslint/require-await
    prepareHeaders: async (headers, { getState }) => {
      const currentState: any = getState();
      const token = currentState?.auth?.accessToken;
      if (token) {
        headers.set('Authorization', token as string);
      }
      return headers;
    },
  }),
  tagTypes: ['comments','book','review'],
  endpoints: () => ({}),
});
