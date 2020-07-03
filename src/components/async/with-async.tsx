import React, { useCallback } from "react";
import {
  AsyncFulfilled,
  AsyncOptions,
  AsyncProps,
  AsyncState,
  useAsync
} from "react-async";
import AsyncWrapper from "components/async/async-wrapper";
import { TAsyncResult } from "types/async";

type ComponentParams<T, P> = Pick<P, Exclude<keyof P, keyof TAsyncResult<T>>>;

type TAsyncParams<T, P> = {
  persist?: boolean | undefined;
} & AsyncOptions<T>;

const useAsyncApi = <T, P>(
  fn: (params: P) => Promise<T>,
  params: AsyncOptions<T>
): AsyncState<T> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const promiseFn = useCallback(
    (props: AsyncProps<T>): Promise<T> => fn(props as P),
    [fn]
  );
  return useAsync<T>({ promiseFn, ...params });
};

export const withAsync = <T, P>(
  Component: React.ComponentType<P>,
  fn: (params: ComponentParams<T, P>) => Promise<T>,
  params?: TAsyncParams<T, P>
) => (props: ComponentParams<T, P>): React.ReactElement => {
  const { persist, ...rest } = params || {};
  const state = useAsyncApi<T, P>(fn, {
    ...props,
    ...rest
  });
  return (
    <AsyncWrapper state={state} persist={persist}>
      {(data): React.ReactElement => (
        <Component
          data={data}
          asyncState={state as AsyncFulfilled<T>}
          {...(props as P)}
        />
      )}
    </AsyncWrapper>
  );
};
