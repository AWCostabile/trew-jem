import styled from 'react-emotion';
import { themePadding } from '../utils';
import { Palette, SpaceUnit } from '../variables';

export const ButtonContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled('button')`
  ${themePadding({ x: 2, y: 1 })}

  flex: 0 0 auto;
  box-shadow: 0 3px 6px ${Palette.Grey[44]};
  border-radius: ${SpaceUnit * 0.5}px;
  background: ${Palette.Grey[44]};
  border: ${Palette.Grey.CC};
  color: ${Palette.Grey.F2};
  cursor: pointer;
`;
