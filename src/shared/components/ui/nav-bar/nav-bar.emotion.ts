import styled from 'react-emotion';
import { themePadding } from 'shared/styling/utils';

export const NavBarContainer = styled('div')`
  display: flex;
`;

export const NavContainerTab = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const NavItemTab = styled('div')`
  ${themePadding({ all: 3 })};
`;
