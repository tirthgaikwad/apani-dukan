import Home from './pages/Home';
import Diwali from './pages/Diwali';
import ValentinesDay from './pages/ValentinesDay';
import RakshaBandhan from './pages/RakshaBandhan';
import Birthdays from './pages/Birthdays';
import GaneshChaturthi from './pages/GaneshChaturthi';
import Holi from './pages/Holi';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Diwali',
    path: '/diwali',
    element: <Diwali />
  },
  {
    name: "Valentine's Day",
    path: '/valentines-day',
    element: <ValentinesDay />
  },
  {
    name: 'Raksha Bandhan',
    path: '/raksha-bandhan',
    element: <RakshaBandhan />
  },
  {
    name: 'Birthdays',
    path: '/birthdays',
    element: <Birthdays />
  },
  {
    name: 'Ganesh Chaturthi',
    path: '/ganesh-chaturthi',
    element: <GaneshChaturthi />
  },
  {
    name: 'Holi',
    path: '/holi',
    element: <Holi />
  }
];

export default routes;
