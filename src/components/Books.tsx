import { useGetBooksQuery } from '@/redux/features/book/book.api';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Books: FC = () => {
  const { data, isLoading, isError, error } = useGetBooksQuery(undefined);
  const navigate = useNavigate();

  const handleBookClick = (id: string) => {
    navigate(`/book/details/${id}`);
  };

  let content = null;
  if (isLoading && !isError) {
    content = <p>loading</p>;
  } else if (isError) {
    content = <p>{String(error)}</p>;
  } else if (!isLoading && !isError && data?.data) {
    content = (
      <>
        {data.data.map(book => (
          <div
            key={book.title}
            onClick={() => handleBookClick(book._id)}
            className="group relative mb-2 cursor-pointer"
          >
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
              <img
                src={
                  'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg'
                }
                alt={book.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-6 font-semibold text-gray-900">
              <span className="absolute inset-0" />
              {book.title}
            </h3>
            <p className="text-xs text-gray-500">
              <span className="font-semibold">author: </span> {book.author}
            </p>
            <p className="text-xs text-gray-500">
              <span className="font-semibold">genre: </span>{' '}
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {book.genre}
              </span>
            </p>
            <p className="  text-xs text-gray-500">
              <span className="font-semibold">published at: </span>
              {new Date(book.publicationDate).toDateString()}
            </p>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
        <h2 className="text-2xl font-bold text-gray-900">Books</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Books;
