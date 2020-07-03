import React, { useCallback, useContext } from "react";
import { ChatContext } from "components/chat-context-provider";
import UserName from "components/user/user-name/user-name";
import styles from "components/chat/chat-header/chat-header.module.scss";
import { TUser } from "types/user";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { LogOut } from "react-feather";

const ChatHeader = (): React.ReactElement => {
  const { logout, user: { nickname } = {} as TUser } = useContext(ChatContext);
  const { push } = useHistory();

  const handleLogout = useCallback((): void => {
    logout();
    push("/");
  }, [push, logout]);

  return (
    <div className={styles.cont}>
      <UserName name={nickname} big />
      <Button variant="outline-primary" onClick={handleLogout}>
        <LogOut />Logout
      </Button>
    </div>
  );
};

export default ChatHeader;
