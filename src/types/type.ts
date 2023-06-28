export type Users = {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: Boolean | null;
  authId: string;
  polledPopular?: Boolean | null;
  polledOther?: Boolean | null;
};

// export type Items = {
//   id: number;
//   name: string;
//   description: string;
//   image: string[];
//   itemCategory?: number | null;
//   createdAt?: Date | null;
//   intheOffice: boolean;
//   author?: string | null;
//   otherItem?: boolean | null;
// };

export type Items = {
  id: number;
  itemName: string;
  description: string;
  image: string[];
  itemCategory?: number | null;
  createdAt?: Date | null;
  intheOffice: boolean;
  author?: string | null;
  otherItem?: boolean | null;
  isDiscontinued?: boolean;
};

export type Questionnaire = {
  id: number;
  name: string;
  Polleditems: 
    {
      id: number;
      itemId?: number;
      questionnairId?: number;
    }[];
  description: string;
  createdAt: Date;
  category: number;
  startDate: Date;
  endDate: Date;
  author?: number;
};

export type Polls = {
  id: number;
  questionnaireId: number;
  userId: number;
  result: number;
  createdAt: Date;
  category: number;
};

export type Post = {
  id: number;
  userId: number;
  content: string;
  itemId: number;
  postImage: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: number;
  userId: number;
  content: string;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type StockHistory = {
  id: number;
  itemId: number;
  quantity: number;
  day: string;
  incOrDec: boolean;
  stockAmount: number;
};

export type Like = {
  id: number;
  userId: number;
  postId: number;
  time: Date;
};
