import styled from 'react-emotion';
import { themePadding } from '../utils';
import { Palette, SpaceUnit } from '../variables';

export const BaseInput = styled('input')`
  ${themePadding({ x: 2, y: 1 })}

  border-radius: ${SpaceUnit * 0.5}px;
  background: #FFF;
  border: ${Palette.Grey[77]};
  color: ${Palette.Grey[44]};
`;
