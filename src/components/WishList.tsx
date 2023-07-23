import { IBook } from '@/interfaces';
import {
  useAddToWishListMutation,
  useGetWishListQuery,
} from '@/redux/features/wishList/wishList.api';
import { Tooltip } from 'antd';
import { Heart, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export default function WishList() {
  const [wishList, setWishList] = useState<IBook[]>([]);
  const { data } = useGetWishListQuery(undefined);

  const [addToWishList] = useAddToWishListMutation();

  const handleAddToWishList = (id: string) => {
    addToWishList({ book: id });
  };

  useEffect(() => {
    if (data?.data) {
      setWishList(data?.data?.books);
    }
  }, [data]);

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
        <div className="space-y-5 mt-4">
          {wishList?.map((product) => (
            <div
              className="border  p-5 flex justify-between rounded-md"
              key={product.title}
            >
              <div>
                <div className="px-2 w-full flex flex-col gap-3 text-sm">
                  <p>Title: {product.title}</p>
                </div>
                <div className="px-2 w-full flex flex-col gap-3 text-sm">
                  <p>Auth: {product.author}</p>
                </div>
              </div>
              <div>
                <Tooltip title={'Remove from wish List'}>
                  <Button
                    onClick={() => handleAddToWishList(product._id)}
                    variant="ghost"
                  >
                    <Minus size="25" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
