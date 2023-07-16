import { BookForm } from '@/components/BookForm';
import { FC } from 'react';

export const AddBook: FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
        <BookForm mode="view" />
      </div>
    </div>
  );
};
