import { IBook } from '@/interfaces';
import {
  useAddBookMutation,
  useEditBookMutation,
  useSingleBookQuery,
} from '@/redux/features/book/book.api';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Toaster } from './ui/Toaster';

const formInititalValue: Partial<IBook> = {
  title: '',
  genre: '',
  author: '',
  publicationDate: new Date().toISOString(),
};

type PropsType = {
  mode: 'view' | 'edit';
};

export const BookForm: FC<PropsType> = ({ mode }) => {
  const search = useParams();

  const { data } = useSingleBookQuery(search?.id as string);

  const [formData, setFormData] = useState<Partial<IBook>>(formInititalValue);

  const [addBook] = useAddBookMutation();
  const [editBook, { isSuccess: editSuccess }] = useEditBookMutation();

  useEffect(() => {
    if (data?.data && mode === 'edit') {
      setFormData({
        title: data.data.title,
        author: data.data.author,
        genre: data.data.genre,
        publicationDate: data.data.publicationDate,
        _id: search?.id as string,
      });
    }
  }, [data, mode, search?.id]);

  const sumbitBook = (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'view') {
      addBook(formData);
    } else {
      editBook(formData);
    }

    setFormData(formInititalValue);
  };

  let alert = null;

  if (editSuccess) {
    alert = <Toaster />;
  }
  return (
    <>
      <form onSubmit={sumbitBook}>
        {alert}
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Book
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }))
                    }
                    value={formData.title}
                    required
                    type="text"
                    name="title"
                    id="first-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Genre
                </label>
                <div className="mt-2">
                  <input
                    value={formData.genre}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        genre: e.target.value,
                      }))
                    }
                    required
                    type="text"
                    name="genre"
                    id="last-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Author
                </label>
                <div className="mt-2">
                  <input
                    required
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        author: e.target.value,
                      }))
                    }
                    value={formData.author}
                    type="text"
                    name="author"
                    id="last-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};
