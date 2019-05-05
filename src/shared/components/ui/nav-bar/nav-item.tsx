import * as React from 'react';
import { ITabItem } from 'shared/types/routing';
import { NavItemTab } from './nav-bar.emotion';

export class NavItem extends React.Component<ITabItem> {
  render() {
    const { label } = this.props;
    return <NavItemTab>{label}</NavItemTab>;
  }
}
