import { IBook } from '@/interfaces';
import { BR } from '@/redux/api/api.interface';
import { apiSlice } from '@/redux/api/api.slice';

const searchAndFilterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchBook: builder.query<BR<IBook[]>, string>({
      query: (value: string) => `/books?searchTerm=${value}`,
      providesTags: ['book'],
    }),

    filterBook: builder.query<BR<IBook>, string>({
      query: (id: string) => `/books/${id}`,
      providesTags: ['book'],
    }),
    // getReview: builder.query({
    //   query: (id: string) => `/books/review/${id}`,
    //   providesTags: ['review'],
    // }),
  }),
});

export const { useFilterBookQuery, useSearchBookQuery } = searchAndFilterApi;
