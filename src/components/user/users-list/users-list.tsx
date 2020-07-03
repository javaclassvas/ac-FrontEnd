import React from "react";
import { ListGroup } from "react-bootstrap";
import { withAsync } from "components/async/with-async";
import * as chatApi from "api/chat";
import { TUser } from "types/user";
import UserName from "components/user/user-name/user-name";
import { TAsyncResult } from "types/async";

type TUsersListProps = TAsyncResult<TUser[]>;

const UsersList = ({ data }: TUsersListProps): React.ReactElement => {
  return (
    <ListGroup className="w-100 h-100 overflow-auto d-flex flex-column">
      {data.map(({ id, nickname }) => (
        <ListGroup.Item key={id}>
          <UserName name={nickname} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default withAsync(UsersList, () => chatApi.getUsers());
