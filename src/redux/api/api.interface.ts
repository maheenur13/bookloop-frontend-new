export type BR<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};
export type IErrorData = {
  success: number;
  message: string;
};

export type IError = {
  data: IErrorData;
  status: number;
};
