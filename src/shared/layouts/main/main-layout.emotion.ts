import styled from 'react-emotion';
import { Palette } from 'shared/styling/variables';

export const MainLayoutContainer = styled('div')`
  background: linear-gradient(${Palette.Grey.DD}, ${Palette.Grey.CC});
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  justify-content: center;
  align-items: center;
`;
