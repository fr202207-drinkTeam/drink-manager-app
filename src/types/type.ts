export type Users = {
  id: Number;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  isAdmin: Boolean;
  authId: String;
  polledPopular: Boolean;
  polledOther: Boolean;
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
