import React from "react";
import {
  IfPending,
  IfFulfilled,
  IfRejected,
  FulfilledChildren,
  AsyncInitial,
  AbstractState,
  AsyncPending,
  AsyncRejected,
  AsyncFulfilled
} from "react-async";
import { Alert, Spinner } from "react-bootstrap";

const AsyncWrapper = <T extends {}>({
  children,
  persist,
  state
}: {
  children?: FulfilledChildren<T>;
  persist?: boolean | undefined;
  state:
    | AsyncInitial<T, AbstractState<T>>
    | AsyncPending<T, AbstractState<T>>
    | AsyncFulfilled<T, AbstractState<T>>
    | AsyncRejected<T, AbstractState<T>>;
}): JSX.Element => {
  return (
    <>
      <IfPending state={state}>
        <Spinner animation="border" variant="primary" />
      </IfPending>
      <IfRejected state={state}>
        {(error): React.ReactElement => (
          <Alert variant="danger">{error.message}</Alert>
        )}
      </IfRejected>
      <IfFulfilled state={state} persist={persist}>
        {children}
      </IfFulfilled>
    </>
  );
};

export default AsyncWrapper;
