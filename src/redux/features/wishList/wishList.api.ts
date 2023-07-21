import { IBook } from '@/interfaces';
import { BR } from '@/redux/api/api.interface';
import { apiSlice } from '@/redux/api/api.slice';

const wishListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishList: builder.query<BR<IBook[]>, undefined>({
      query: () => '/wish-list',
      //   providesTags: ['book'],
    }),
    addToWishList: builder.mutation({
      query: (data) => ({
        url: `/wish-list`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['book'],
    }),
    deleteFromWishList: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      //   invalidatesTags: ['book'],
    }),
  }),
});

export const {
  useAddToWishListMutation,
  useDeleteFromWishListMutation,
  useGetWishListQuery,
} = wishListApi;
