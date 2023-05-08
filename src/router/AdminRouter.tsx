import Consumption from "../components/pages/Consumption";
import Addition from "../components/pages/Addition";
import History from "../components/pages/History";
import AddItem from "../components/pages/AddItem";
import ItemEdit from "../components/pages/ItemEdit";
import AddPoll from "../components/pages/AddPoll";
import AdminHome from "../components/pages/AdminHome";
import HistoryCopy from "../components/pages/HistoryCopy";

export const AdminRouter = [
  { path: "/consumption", element: <Consumption /> },
  { path: "/addition", element: <Addition /> },
  { path: "/history", element: <HistoryCopy /> },
  { path: "/additem", element: <AddItem /> },
  { path: "/addpoll", element: <AddPoll /> },
  { path: "/itemedit/:id", element: <ItemEdit /> },
  // { path: "/", element: <AdminHome /> },
];
