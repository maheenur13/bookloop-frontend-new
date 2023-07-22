import { IBook } from '@/interfaces';
import { BR } from '@/redux/api/api.interface';
import { apiSlice } from '@/redux/api/api.slice';
import {
  setGenre,
  setPublicationYears,
} from '../searchAndFilter/searchAndFilter.slice';

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<BR<IBook[]>, string | undefined>({
      query: (query) => (query ? `/books${query}` : '/books'),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            setPublicationYears(
              [...result.data.data].map((book) => book.publicationYear)
            )
          );
          dispatch(setGenre([...result.data.data].map((book) => book.genre)));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ['book'],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['book'],
    }),
    editBook: builder.mutation({
      query: (data) => ({
        url: `/books/${data?._id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    singleBook: builder.query<BR<IBook>, string>({
      query: (id: string) => `/books/${id}`,
      providesTags: ['book'],
    }),
    getReview: builder.query({
      query: (id: string) => `/books/review/${id}`,
      providesTags: ['review'],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `/books/add-review`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddReviewMutation,
  useSingleBookQuery,
  useAddBookMutation,
  useEditBookMutation,
  useGetReviewQuery,
  useDeleteBookMutation,
} = bookApi;
