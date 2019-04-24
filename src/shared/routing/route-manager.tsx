import * as React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { Error404Page } from 'shared/pages/error';
import { IndexRoute, PrivateRoutes } from './private-routes';
import { loginPath, PublicRoutes } from './public-routes';

interface IRouteManagerProps extends RouteProps {
  isLoggedIn: boolean;
  privateLayout?: React.ComponentType;
  publicLayout?: React.ComponentType;
  setStatus?: (code: number) => void;
}

export class RouteManager extends React.Component<IRouteManagerProps> {
  fallbackRoute = ({ location }: RouteProps) => {
    const { isLoggedIn, setStatus } = this.props;

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

  redirectPath = (pathname?: string) =>
    pathname !== '/' ? `${loginPath}?redirect=${pathname}` : loginPath;

  render() {
    const { isLoggedIn, privateLayout, publicLayout } = this.props;
    const routes = (isLoggedIn ? PrivateRoutes() : PublicRoutes()) || [];
    const Layout =
      (isLoggedIn ? privateLayout : publicLayout) || React.Fragment;

    return (
      <Layout>
        <Switch>
          {routes.map(routeprops => (
            <Route key={routeprops.path} {...routeprops} />
          ))}
          <Route path="/" render={this.fallbackRoute} />
        </Switch>
      </Layout>
    );
  }
}
