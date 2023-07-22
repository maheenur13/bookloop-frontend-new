export type IReadingPlans = {
  book: IBook;
  status: 'in-complete' | 'complete';
};

export type IUser = {
  id: string;
  email: string;
  password: string;
  wishList?: IWishList[];
  readingPlans?: IReadingPlans[];
};

export type IReview = {
  review: string;
  user: IUser;
};

export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: IReview[];
  uploadedBy: IUser;
  publicationYear: number;
};

export type IWishList = {
  id: string;
  wishList: IBook[];
};
