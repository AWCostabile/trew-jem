import * as React from 'react';
import {
  matchPath,
  Redirect,
  Route,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import { Error404Page } from 'shared/pages/error';
import { IRoute, IRouterLayout } from 'shared/types/routing';
import { IndexRoute, PrivateRoutes } from './private-routes';
import { loginPath, PublicRoutes } from './public-routes';

interface IRouteManagerProps {
  isLoggedIn: boolean;
  privateLayout?: React.ComponentType<IRouterLayout>;
  publicLayout?: React.ComponentType<IRouterLayout>;
  setStatus?: (code: number) => void;
}

export class RouteManager extends React.Component<IRouteManagerProps> {
  get connectedProps() {
    return this.props as IRouteManagerProps & RouteComponentProps;
  }

  get currentRoute() {
    const route =
      (global.window &&
        global.window.location &&
        global.window.location.pathname) ||
      '/';
    return route;
  }

  get layout() {
    const { isLoggedIn, privateLayout, publicLayout } = this.connectedProps;

    return (isLoggedIn ? privateLayout : publicLayout) || React.Fragment;
  }

  fallbackRoute = ({ location }: RouteComponentProps) => {
    const { isLoggedIn, setStatus } = this.connectedProps;

    const redirect =
      isLoggedIn && location && location.pathname.match(/^\/login/) && 302;

    if (setStatus) {
      setStatus(isLoggedIn ? redirect || 404 : 401);
    }

    return !isLoggedIn ? (
      <Redirect to={this.redirectPath(location && location.pathname)} />
    ) : (
      (redirect && <Redirect to={IndexRoute} />) || <Error404Page />
    );
  };

  navigationItems = (routes: IRoute[]) =>
    routes.map(({ disabled, icon, name, path }) => ({
      disabled,
      isCurrent: !!matchPath(this.currentRoute, path),
      icon,
      name,
      path
    }));

  redirectPath = (pathname?: string) =>
    pathname !== '/' ? `${loginPath}?redirect=${pathname}` : loginPath;

  render() {
    const Layout = this.layout as React.ComponentType<IRouterLayout>;
    const routes: IRoute[] = [
      ...(this.connectedProps.isLoggedIn ? PrivateRoutes() : PublicRoutes())
    ];

    return (
      <Layout navItems={this.navigationItems(routes)}>
        <Switch>
          {routes.map(({ component: Component, ...routeprops }) => (
            <Route
              {...routeprops}
              key={routeprops.path}
              render={(matchProps: any) => {
                return <Component />;
              }}
            />
          ))}
          <Route render={this.fallbackRoute} />
        </Switch>
      </Layout>
    );
  }
}
