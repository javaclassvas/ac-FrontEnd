import axios from "axios";
import { TUser } from "types/user";
import { TMessage } from "types/chat";

export const getUsers = async (): Promise<TUser[]> => {
  const { data } = await axios.get("/api/users/list");
  return data;
};

export const getLastMessages = async (): Promise<TMessage[]> => {
  const { data } = await axios.get("/api/messages/list");
  return data;
};

export const sendMessage = async (
  userId: number,
  content: string
): Promise<TMessage> => {
  const { data } = await axios.put("/api/messages", {
    userId,
    content
  });
  return data;
};
