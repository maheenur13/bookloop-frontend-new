import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export default function WishList() {
  const {
    user: { wishList },
  } = useAppSelector((state) => state.user);
  //   const { products, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <Heart size="25" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Wish List</SheetTitle>
          {/* <h1>Total: {wishList.length}</h1> */}
        </SheetHeader>
        <div className="space-y-5">
          {wishList?.map((product) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={product.title}
            >
              <div className="px-2 w-full flex flex-col gap-3">
                <p>Auth: {product.author}</p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
