import * as React from 'react';
import { NavBar } from 'shared/components/ui/nav-bar/nav-bar';
import { IRouterLayout } from 'shared/types/routing';
import { MainLayoutContainer } from './main-layout.emotion';

export class MainLayout extends React.Component<IRouterLayout> {
  render() {
    const { children, navItems } = this.props;

    return (
      <MainLayoutContainer>
        <NavBar navItems={navItems} />
        {children}
      </MainLayoutContainer>
    );
  }
}
