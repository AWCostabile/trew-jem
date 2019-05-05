import * as React from 'react';
import { ITabContainer } from 'shared/types/routing';
import { NavContainerTab } from './nav-bar.emotion';

export class NavContainer extends React.Component<ITabContainer> {
  get children() {
    const { children } = this.props;

    if (!Array.isArray(children)) {
      return children;
    }

    return children.map((child: any, index: number) => {
      if (!child.type || child.type.name !== 'NavItem') {
        return child;
      }

      return <div onClick={this.clickHandler.bind(this, index)}>{child}</div>;
    });
  }

  clickHandler = (index: number, evt: any) => {
    const { onChange } = this.props;

    onChange(evt, index);
  };

  render() {
    return <NavContainerTab>{this.children}</NavContainerTab>;
  }
}
