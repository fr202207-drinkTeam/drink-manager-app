export type Users = {
  id: Number | null;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  isAdmin: Boolean | null;
  authId: String;
  polledPopular: Boolean | null;
  polledOther: Boolean | null;
};

export type Items = {
  id: Number;
  name: String;
  description: String;
  image: string;
  itemCategory: String;
  createdAt: Date;
  intheOffice: Boolean;
  author: String;
};
