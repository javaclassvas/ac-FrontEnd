import { Route, Redirect } from "react-router-dom";
import Login from "components/user/login/login";
import { ChatContext } from "components/chat-context-provider";
import React, { useContext } from "react";
import Chat from "components/chat";
import { TUser } from "types/user";

const ChatRouter = (): React.ReactElement => {
  const { user: { id: userId } = {} as TUser } = useContext(ChatContext);
  if (!userId) {
    return (
      <>
        <Route exact path="/login">
          <Login />
        </Route>
        <Redirect to="/login" />
      </>
    );
  }
  return (
    <Route exact path="/">
      <Chat />
    </Route>
  );
};

export default ChatRouter;
