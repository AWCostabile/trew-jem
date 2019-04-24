import { LoginPage } from 'shared/pages/login';
import { IRoute } from 'shared/types/routing';

export const loginPath = '/login';

export const PublicRoutes = (): IRoute[] => [
  {
    path: loginPath,
    component: LoginPage
  }
];
