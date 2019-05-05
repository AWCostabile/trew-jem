import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IRouterLayout, ITabContainer, ITabItem } from 'shared/types/routing';

interface IRoutedTabsProps extends IRouterLayout {
  tabContainer: React.ComponentType<ITabContainer>;
  tabItem: React.ComponentType<ITabItem>;
  onFailure: (reason: string) => void;
}

interface IRoutedTabsExtendedProps
  extends IRoutedTabsProps,
    RouteComponentProps {}

interface IRoutedTabsState {
  value: number;
}

class RoutedTabs extends React.Component<
  IRoutedTabsExtendedProps,
  IRoutedTabsState
> {
  constructor(props: IRoutedTabsExtendedProps, context: any) {
    super(props, context);

    this.state = { value: this.extractIndex(props) };
  }

  extractIndex = ({ navItems }: IRoutedTabsExtendedProps) => {
    const index = navItems.findIndex(({ isCurrent }) => !!isCurrent);
    return index >= 0 ? index : 0;
  };

  handleChange = (_: any, value: number) => {
    this.setState({ value }, this.onTabChange);
  };

  onTabChange = () => {
    const { history, navItems, onFailure } = this.props;
    const { value } = this.state;

    const route = navItems[value];

    if (route) {
      history.push(route.path);
    } else {
      onFailure('Error navigating to selected tab');
    }
  };

  render() {
    const { tabItem: TabItem, tabContainer: TabContainer } = this.props;

    return (
      <TabContainer onChange={this.handleChange} value={this.state.value}>
        {this.props.navItems.map(({ disabled, icon, name, path }) => (
          <TabItem key={path} disabled={disabled} icon={icon} label={name} />
        ))}
      </TabContainer>
    );
  }
}

const WrappedRoutedTabs = withRouter(RoutedTabs);

export { WrappedRoutedTabs as RoutedTabs };
