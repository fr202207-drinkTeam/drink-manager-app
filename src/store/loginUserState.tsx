import { atom } from "recoil";
import { Users } from "../types/type";

export const loginUserState = atom<Users>({
  key: "loginUserState",
  default: {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: null,
    authId: '',
  },
});
