import React, { createContext } from "react";
import * as userApi from "api/user";
import { TUser } from "types/user";
import socket from "app/websockets";
import { TMessage } from "types/chat";
import PubSub from "pubsub-js";
import {useStateWithLocalStorage} from "hooks";

type TChatContext = {
  user?: TUser;
  login: (nickname: string) => Promise<void>;
  logout: () => void;
};

export const ChatContext = createContext<TChatContext>({} as TChatContext);

export const NEW_MESSAGE_EVENT = "new-message";

export const ChatContextProvider: React.FC = ({
  children
}): React.ReactElement => {
  const [user, setUser] = useStateWithLocalStorage<TUser | undefined>(
    "chatUser"
  );

  const login = async (nickname: string): Promise<void> =>
    setUser(await userApi.login(nickname));

  const logout = () => setUser(undefined);

  socket.on(NEW_MESSAGE_EVENT, (data: TMessage) => {
    console.log(data);
    PubSub.publish(NEW_MESSAGE_EVENT, data);
  });

  const value: TChatContext = {
    user,
    login,
    logout
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
