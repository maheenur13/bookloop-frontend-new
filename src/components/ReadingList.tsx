import { IBook } from '@/interfaces';
import {
  useGetReadingPlansQuery,
  useUpdateStatusMutation,
} from '@/redux/features/readingPlan/readingPlan.api';
import { BookMarked, CheckCheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export default function ReadingList() {
  const [allReadingPlans, setAllRedingPlans] = useState<{
    books: {
      book: IBook;
      status: 'complete' | 'in-complete';
    }[];
  }>();
  const { data: readingPlanData } = useGetReadingPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateStatus] = useUpdateStatusMutation();

  //   const [addToWishList] = useAddToWishListMutation();

  const handleUpdateStatus = (id: string) => {
    // addToWishList({ book: id });
    updateStatus({
      book: id,
      status: 'complete',
    });
  };

  useEffect(() => {
    if (readingPlanData) {
      setAllRedingPlans(readingPlanData?.data);
    }
  }, [readingPlanData]);

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <BookMarked size="25" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Reading Plan</SheetTitle>
          {/* <h1>Total: {wishList.length}</h1> */}
        </SheetHeader>
        <div className="space-y-5 mt-4">
          {allReadingPlans?.books &&
            allReadingPlans?.books?.map((plan, idx) => (
              <div
                className="border  p-5 flex justify-between rounded-md"
                key={idx}
              >
                <div>
                  <div className="px-2 w-full flex flex-col gap-3 text-sm">
                    <p>Title: {plan.book.title}</p>
                  </div>
                  <div className="px-2 w-full flex flex-col gap-3 text-sm">
                    <p>Author: {plan.book.author}</p>
                  </div>
                </div>
                <div>
                  {plan.status === 'in-complete' && (
                    <Button
                      onClick={() => handleUpdateStatus(plan.book._id)}
                      variant="ghost"
                      className="text-green-500"
                    >
                      Mark as complete
                    </Button>
                  )}
                  {plan.status === 'complete' && (
                    <CheckCheckIcon color="green" size={25} />
                  )}
                </div>
              </div>
            ))}
          {allReadingPlans?.books && allReadingPlans?.books?.length < 1 && (
            <p>Plan empty!</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
