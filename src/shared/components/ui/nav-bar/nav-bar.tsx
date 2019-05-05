import * as React from 'react';
import { RoutedTabs } from 'shared/routing/route-tabs';
import { UiStore } from 'shared/stores/ui-store';
import { IRouterLayout } from 'shared/types/routing';
import { connectStores } from 'shared/utils/store-utils';
import { NavContainer } from './nav-container';
import { NavItem } from './nav-item';

interface INavBarConnectedProps extends IRouterLayout {
  queueToast: UiStore['queueToast'];
}

class NavBar extends React.Component<IRouterLayout> {
  get connectedProps() {
    return this.props as INavBarConnectedProps;
  }

  onFailure = (text: string) => {
    const { queueToast } = this.connectedProps;

    queueToast({ text });
  };

  render() {
    const { navItems } = this.props;

    return (
      <RoutedTabs
        navItems={navItems}
        onFailure={this.onFailure}
        tabContainer={NavContainer}
        tabItem={NavItem}
      />
    );
  }
}

const WrappedNavBar = connectStores(({ uiStore: { queueToast } }) => ({
  queueToast
}))(NavBar);

export { WrappedNavBar as NavBar };
