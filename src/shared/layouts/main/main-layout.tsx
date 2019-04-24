import * as React from 'react';
import { MainLayoutContainer } from './main-layout.emotion';

export class MainLayout extends React.Component {
  render() {
    const { children } = this.props;

    return <MainLayoutContainer>{children}</MainLayoutContainer>;
  }
}
