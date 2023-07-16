import { IBook } from '@/interfaces';
import { BR } from '@/redux/api/api.interface';
import { apiSlice } from '@/redux/api/api.slice';
import { IReviewPayload } from './book.interfaces';

const bookApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBooks: builder.query<BR<IBook[]>, undefined>({
      query: () => '/books',
    }),
    singleBook: builder.query<BR<IBook>, string>({
      query: (id: string) => `/books/${id}`,
    }),
    addReview: builder.mutation<any, { id: string; data: IReviewPayload }>({
      query: ({ id, data }) => ({
        url: `/books/add-review/${id}`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ['comments'],
    }),
    // getComment: builder.query({
    //   query: id => `/comment/${id}`,
    //   // providesTags: ['comments'],
    // }),
  }),
});

export const { useGetBooksQuery, useAddReviewMutation, useSingleBookQuery } =
  bookApi;
