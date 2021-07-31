export interface IGenericResponseProps<T> {
  status: number;
  data: IGenericResponseContentProps<T>;
}

interface IGenericResponseContentProps<T> {
  content: T;
  error_message: string | null;
  success: Boolean;
}
