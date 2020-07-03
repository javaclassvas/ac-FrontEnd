import axios from "axios";
import { TUser } from "types/user";

export const login = async (nickname: string): Promise<TUser> => {
  const { data } = await axios.put("/api/users", { nickname });
  return data;
};
