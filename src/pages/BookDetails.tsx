/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import { IBook } from '@/interfaces';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from '@/redux/features/book/book.api';
import {
  useAddToReadingPlanMutation,
  useGetReadingPlansQuery,
} from '@/redux/features/readingPlan/readingPlan.api';
import {
  useAddToWishListMutation,
  useGetWishListQuery,
} from '@/redux/features/wishList/wishList.api';
import { useAppSelector } from '@/redux/hook';
import { Tooltip } from 'antd';
import { BookMarked, Heart } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const BookDetails: FC = () => {
  const navigate = useNavigate();
  const search = useParams();
  const {
    user: { email },
  } = useAppSelector((state) => state.user);
  const [allWishList, setAllWishList] = useState<IBook[]>();
  const [allReadingPlans, setAllRedingPlans] = useState<{
    books: {
      book: IBook;
      status: 'complete' | 'in-complete';
    }[];
  }>();
  const [bookData, setBoookData] = useState<IBook>();
  const [isAlertShow, setIsAlertShow] = useState(false);

  const { data: wishListData } = useGetWishListQuery(undefined);
  const { data: readingPlanData } = useGetReadingPlansQuery(undefined);

  const [addToWishList] = useAddToWishListMutation();
  const [addToReadingPlan] = useAddToReadingPlanMutation();

  const { data } = useSingleBookQuery(search?.id as string);
  const [deleteBook, { isSuccess }] = useDeleteBookMutation();

  const handleAlertShow = () => {
    setIsAlertShow(true);
  };
  const handleDeleteBook = (id: string) => {
    deleteBook(id);
  };

  const handleAddToReadingList = () => {
    addToReadingPlan({ book: bookData?._id });
  };
  const handleAddToWishList = () => {
    if (bookData) {
      addToWishList({ book: bookData._id! });
    }
  };

  useEffect(() => {
    if (wishListData) {
      setAllWishList(wishListData?.data?.books);
    }
  }, [wishListData]);
  useEffect(() => {
    if (readingPlanData) {
      setAllRedingPlans(readingPlanData.data);
    }
  }, [readingPlanData]);
  useEffect(() => {
    if (data?.data) {
      setBoookData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/all-books', { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
          <div className="flex">
            <Tooltip title={'Add to Reading List'}>
              <Button
                onClick={handleAddToReadingList}
                variant="ghost"
                disabled={
                  allReadingPlans?.books?.find(
                    (plan) => plan.book._id === bookData?._id
                  )
                    ? true
                    : false
                }
              >
                <BookMarked
                  color={
                    allReadingPlans?.books?.find(
                      (plan) => plan.book._id === bookData?._id
                    )
                      ? 'green'
                      : 'black'
                  }
                  size="25"
                />
              </Button>
            </Tooltip>
            <Tooltip
              title={
                !allWishList?.find((book: IBook) => book?._id === bookData?._id)
                  ? 'Add to Wish List'
                  : 'Remove From Wish List'
              }
            >
              <Button onClick={handleAddToWishList} variant="ghost">
                <Heart
                  size="25"
                  fill={
                    allWishList?.find(
                      (book: IBook) => book?._id === bookData?._id
                    )
                      ? 'red'
                      : 'white'
                  }
                  color={
                    allWishList?.find(
                      (book: IBook) => book?._id === bookData?._id
                    )
                      ? 'red'
                      : 'black'
                  }
                />
              </Button>
            </Tooltip>

            <Link
              to={`/book/edit/${bookData?._id}`}
              className="flex mx-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit
            </Link>

            <button
              onClick={handleAlertShow}
              disabled={bookData?.uploadedBy?.email !== email}
              className="flex mx-2 justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 disabled:bg-slate-300 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          </div>
        </div>
        {isAlertShow && (
          <div className="bg-slate-200 border border-slate-300 p-2 w-36 ms-auto my-2 flex justify-between">
            <button
              onClick={() => handleDeleteBook(bookData! && bookData._id!)}
              className="px-2 text-white rounded pb-1 text-xs bg-teal-500"
            >
              yes
            </button>
            <button
              onClick={() => setIsAlertShow(false)}
              className="px-2 text-white rounded pb-1 text-xs bg-red-500"
            >
              no
            </button>
          </div>
        )}
        <div className="mt-6">
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Title
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {bookData?.title}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Author
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {bookData?.author}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Genre
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {bookData?.genre}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Publication Date
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {new Date(bookData?.publicationDate!)?.toDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-6">
          <BookReview
            id={bookData?._id!}
            reviewData={bookData?.reviews || []}
          />
        </div>
      </div>
    </div>
  );
};
