import { useDebounce } from '@/hooks/useDebounce';
import { IBook } from '@/interfaces';
import { useGetBooksQuery } from '@/redux/features/book/book.api';
import { useAppSelector } from '@/redux/hook';
import { Input, Select } from 'antd';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type IQueryType = {
  genre: string;
  publicationYear: string;
  searchTerm: string;
};

const Books: FC = () => {
  // const [searchTerm, setSearchTerm] = useState<string>('');

  const [query, setQuery] = useState<string>();
  const [queryItems, setQueryItems] = useState<IQueryType>({
    genre: '',
    publicationYear: '',
    searchTerm: '',
  });
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);
  const { data, isLoading, isError, error, refetch } = useGetBooksQuery(query);

  const { allGenre, allPublicationYears } = useAppSelector(
    (state) => state.searchFilter
  );
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState<IBook[]>([]);

  const handleBookClick = (id: string) => {
    navigate(`/book/details/${id}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleGenreChange = (e: any) => {
    setQueryItems((prevState) => ({ ...prevState, genre: e ? e : '' }));
  };
  const handleYearChange = (e: any) => {
    console.log(e);

    setQueryItems((prevState) => ({
      ...prevState,
      publicationYear: String(e ? e : ''),
    }));
  };

  useEffect(() => {
    setQueryItems((prevState) => ({
      ...prevState,
      searchTerm: debouncedValue,
    }));
  }, [debouncedValue]);

  const generateQueryString = (queryItems: IQueryType) => {
    const queryArray = Object.entries(queryItems)
      .filter(([key, value]) => value.length > 0) // Filter out empty values
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`); // Encode values to handle special characters

    setQuery('?' + queryArray.join('&'));
  };

  useEffect(() => {
    generateQueryString(queryItems);
  }, [queryItems]);

  useEffect(() => {
    if (query?.length) {
      refetch();
    }
  }, [query]);
  console.log({ query });

  useEffect(() => {
    if (data?.data) {
      setAllBooks(data?.data);
    }
  }, [data]);

  let content = null;
  if (isLoading && !isError) {
    content = <p>loading</p>;
  } else if (isError) {
    content = <p>{String(error)}</p>;
  } else if (!isLoading && !isError && data?.data) {
    content = (
      <>
        {allBooks.map((book) => (
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
        <div className="text-end flex justify-between">
          <div>
            <p className="text-sm mb-2 text-gray-500">
              Search By Title, author or genre
            </p>
            <Input
              onChange={handleChange}
              placeholder={'title, author or genre'}
            />
          </div>
          <div>
            <p className="text-sm mb-2 text-gray-500">
              Filter By Genre and Publication Year
            </p>
            <Select
              allowClear
              className="mr-2"
              style={{ width: 160 }}
              placeholder="Filter By Genre"
              onChange={handleGenreChange}
              options={[...allGenre].map((genre) => {
                return {
                  value: genre,
                  label: genre,
                };
              })}
            />
            <Select
              allowClear
              placeholder="Filter By Publication year"
              style={{ width: 160 }}
              onChange={handleYearChange}
              options={[...allPublicationYears].map((year) => {
                return {
                  value: year,
                  label: year,
                };
              })}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Books</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {allBooks?.length > 0 ? content : <p>No book found</p>}
        </div>
      </div>
    </div>
  );
};

export default Books;
