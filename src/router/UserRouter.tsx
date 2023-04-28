import Contact from "../components/pages/Contact";
import Faq from "../components/pages/Faq";
import Guide from "../components/pages/Guide";
import ItemDetail from "../components/pages/ItemDetail";
import ItemSearch from "../components/pages/ItemSearch";
import Poll from "../components/pages/Poll";
import PollResult from "../components/pages/PollResult";
import Timeline from "../components/pages/Timeline";
import Top from "../components/pages/Top";

export const UserRouter = [
  { path: "/timeline", element: <Timeline /> },
  { path: "/search", element: <ItemSearch /> },
  { path: "/search/:id", element: <ItemDetail /> },
  { path: "/contact", element: <Contact /> },
  { path: "/guide", element: <Guide /> },
  { path: "/faq", element: <Faq /> },
  { path: "/poll", element: <Poll /> },
  { path: "/poll/:id", element: <PollResult /> },
  { path: "/", element: <Top /> },
];
