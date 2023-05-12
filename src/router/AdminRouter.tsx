import Consumption from "../components/pages/Consumption";
import Addition from "../components/pages/Addition";
import History from "../components/pages/History";
import AddItem from "../components/pages/AddItem";
import ItemEdit from "../components/pages/ItemEdit";
import AddPoll from "../components/pages/AddPoll";

export const AdminRouter = [
  { path: "adminhome/consumption", element: <Consumption /> },
  { path: "adminhome/addition", element: <Addition /> },
  { path: "adminhome/history", element: <History /> },
  { path: "adminhome/additem", element: <AddItem /> },
  { path: "adminhome/addpoll", element: <AddPoll /> },
  { path: "adminhome/itemedit/:id", element: <ItemEdit /> },
];
