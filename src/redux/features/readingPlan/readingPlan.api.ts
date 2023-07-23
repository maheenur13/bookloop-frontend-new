import { IBook } from '@/interfaces';
import { BR } from '@/redux/api/api.interface';
import { apiSlice } from '@/redux/api/api.slice';

const readingPlan = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReadingPlans: builder.query<
      BR<{
        books: {
          book: IBook;
          status: 'complete' | 'in-complete';
        }[];
      }>,
      undefined
    >({
      query: () => '/reading-plan',
      providesTags: ['readingPlan'],
      //   async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
      //     try {
      //       const result = await queryFulfilled;

      //     } catch (error) {
      //       console.log(error);
      //     }
      //   },
    }),
    addToReadingPlan: builder.mutation({
      query: (data) => ({
        url: `/reading-plan`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['readingPlan'],
    }),
    updateStatus: builder.mutation({
      query: (data) => ({
        url: `/reading-plan/${data.book}`,
        method: 'PATCH',
        body: { status: data.status },
      }),
      invalidatesTags: ['readingPlan'],
    }),
  }),
});

export const {
  useAddToReadingPlanMutation,
  useGetReadingPlansQuery,
  useUpdateStatusMutation,
} = readingPlan;
