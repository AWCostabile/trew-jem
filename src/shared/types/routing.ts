import { Omit } from 'react-router';

export interface IRoute {
  component: React.ComponentType;
  disabled?: boolean;
  icon?: React.ReactElement;
  exact?: boolean;
  name?: string;
  path: string;
}

export interface INav extends Omit<IRoute, 'component'> {
  isCurrent?: boolean;
}

export interface IRouterLayout {
  navItems: INav[];
}

export interface ITabContainer {
  onChange: (event: React.ChangeEvent<{}>, value: any) => void;
  value: any;
}

export interface ITabItem {
  disabled?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
}
