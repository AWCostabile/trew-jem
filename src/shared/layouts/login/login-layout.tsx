import * as React from 'react';
import { IRouterLayout } from 'shared/types/routing';
import { LoginLayoutContainer } from './login-layout.emotion';

export class LoginLayout extends React.Component<IRouterLayout> {
  render() {
    const { children } = this.props;

    return <LoginLayoutContainer>{children}</LoginLayoutContainer>;
  }
}
