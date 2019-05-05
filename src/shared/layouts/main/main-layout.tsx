import * as React from 'react';
import { IRouterLayout } from 'shared/types/routing';
import { MainLayoutContainer } from './main-layout.emotion';

export class MainLayout extends React.Component<IRouterLayout> {
  render() {
    const { children } = this.props;

    return <MainLayoutContainer>{children}</MainLayoutContainer>;
  }
}
