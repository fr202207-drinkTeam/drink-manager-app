import { atom } from "recoil";
import { Items } from "../types/type";

export const PollCategoryItemState = atom<Items>({
  key: "pollItemState",
  default: {
    id:0 ,
    name: "",
    description: "",
    image: "",
    itemCategory: null,
    createdAt: null,
    intheOffice: false,
    author: null,
  },
});