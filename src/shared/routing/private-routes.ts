import { AboutPage } from 'shared/pages/about';
import { DashboardPage } from 'shared/pages/dashboard';
import { IRoute } from 'shared/types/routing';

export const IndexRoute = '/';

export const PrivateRoutes = (): IRoute[] => [
  {
    component: DashboardPage,
    exact: true,
    name: 'Dashboard',
    path: IndexRoute
  },
  {
    component: AboutPage,
    exact: true,
    name: 'About',
    path: '/about'
  }
];
