import { IBook } from '@/interfaces';
import { BR } from '@/redux/api/api.interface';
import { apiSlice } from '@/redux/api/api.slice';
import { setWishList } from './wishList.slice';

const wishListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishList: builder.query<BR<{ id: string; books: IBook[] }>, undefined>({
      query: () => '/wish-list',
      providesTags: ['wishList'],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setWishList({
              id: result.data.data.id,
              wishList: result.data.data.books,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addToWishList: builder.mutation({
      query: (data) => ({
        url: `/wish-list`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['wishList'],
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
