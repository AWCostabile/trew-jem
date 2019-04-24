import { DashboardPage } from 'shared/pages/dashboard';
import { IRoute } from 'shared/types/routing';

export const IndexRoute = '/';

export const PrivateRoutes = (): IRoute[] => [
  {
    component: DashboardPage,
    exact: true,
    path: IndexRoute
  }
];
