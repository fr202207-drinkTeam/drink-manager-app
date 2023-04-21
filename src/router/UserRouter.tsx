import Contact from '../components/pages/Contact';
import Faq from '../components/pages/Faq';
import Guide from '../components/pages/Guide';
import ItemDetail from '../components/pages/ItemDetail';
import ItemSearch from '../components/pages/ItemSearch';
import Poll from '../components/pages/Poll';
import PollResult from '../components/pages/PollResult';
import Timeline from '../components/pages/Timeline';

export const UserRouter = [
  { path: '/timeline', element: <Timeline /> },
  { path: '/search', element: <ItemSearch /> },
  // { path: '/search/:id', element: <ItemDetail intheOffice={true} /> }, // 仮で指定
  { path: '/search/:id', element: <ItemDetail /> }, // 仮で指定
  { path: '/contact', element: <Contact /> },
  { path: '/guide', element: <Guide /> },
  { path: '/faq', element: <Faq /> },
  { path: '/poll', element: <Poll /> },
  { path: '/poll/:id', element: <PollResult /> },
];
