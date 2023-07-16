import { IBook } from '@/interfaces';
import { BR } from '@/redux/api/api.interface';
import { apiSlice } from '@/redux/api/api.slice';

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<BR<IBook[]>, undefined>({
      query: () => '/books',
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
