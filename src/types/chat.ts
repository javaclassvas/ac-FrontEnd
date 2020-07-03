import {TUser} from "types/user";

export type TMessage = {
  id: number;
  userId: number;
  user?: TUser;
  createdAt: number;
  content: string;
};
