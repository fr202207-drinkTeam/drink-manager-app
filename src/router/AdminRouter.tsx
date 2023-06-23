import Consumption from "../components/pages/Consumption";
import Addition from "../components/pages/Addition";
import History from "../components/pages/History";
import AddItem from "../components/pages/AddItem";
import ItemEdit from "../components/pages/ItemEdit";
import AddPoll from "../components/pages/AddPoll";
import AdminHome from "../components/pages/AdminHome";
import BannerEdit from "../components/pages/BannerEdit";
import { SetStateAction } from "react";
import PollEditFiltering from "../components/pages/PollEditFiltering";

export const AdminRouter = [
  { path: "/consumption", element: <Consumption /> },
  { path: "/addition", element: <Addition /> },
  { path: "/history", element: <History /> },
  {
    path: "/additem",
    element: (
      <AddItem
        setTrigger={function(value: SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  { path: "/addpoll", element: <AddPoll /> },
  { path: "/polleditfiltering", element: <PollEditFiltering /> },
  { path: "/itemedit/:id", element: <ItemEdit /> },
  { path: "/banneredit", element: <BannerEdit /> },
];
