import {AsyncFulfilled} from "react-async";

export type TAsyncResult<T> = {
  data: T;
  asyncState: AsyncFulfilled<T>;
};
