export interface IRoute {
  component: React.ComponentType;
  exact?: boolean;
  path: string;
}
