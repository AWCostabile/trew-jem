import styled from 'react-emotion';
import { Palette } from 'shared/styling/variables';

export const LoginLayoutContainer = styled('div')`
  background-color: ${Palette.Grey.DD};
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  justify-content: center;
  align-items: center;
`;
