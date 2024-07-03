
export type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
  };
  
  export type FetchDataFunction<T> = (url: string) => Promise<ApiResponse<T>>;
  