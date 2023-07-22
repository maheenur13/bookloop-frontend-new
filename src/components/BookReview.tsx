import { IReview } from '@/interfaces';
import { useAddReviewMutation } from '@/redux/features/book/book.api';
import { useAppSelector } from '@/redux/hook';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface IProps {
  id: string;
  reviewData: IReview[];
}

export default function BookReview({ id, reviewData }: IProps) {
  const {
    user: { email },
  } = useAppSelector((state) => state.user);
  const [inputValue, setInputValue] = useState<string>('');

  //   const { data } = useGetCommentQuery(id, {
  //     refetchOnMountOrArgChange: true,
  //     pollingInterval: 30000,
  //   });
  const [addReview] = useAddReviewMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options = {
      id: id,
      reviews: { review: inputValue },
    };

    addReview(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          required
          className="min-h-[30px] bg-white"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          disabled={!email}
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {reviewData?.length > 0 &&
          reviewData?.map((review: IReview, index: number) => (
            <div
              key={index}
              className="flex gap-3 items-center mb-5 bg-slate-300 p-3 rounded"
            >
              <div>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <p>{review.review}</p>
                <p className="text-xs text-gray-500">By @{review.user.email}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
