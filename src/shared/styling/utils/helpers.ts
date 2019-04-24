import { SpaceUnit } from '../variables';
import { setSizedAttribute } from './sizes';
import { ISized, SizeUnits } from './types';

export const padding = (
  sizes: Partial<ISized>,
  unit?: SizeUnits,
  withSpaces?: boolean
) => setSizedAttribute(sizes, 'padding', withSpaces ? SpaceUnit : 1, unit);

export const margin = (
  sizes: Partial<ISized>,
  unit?: SizeUnits,
  withSpaces?: boolean
) => setSizedAttribute(sizes, 'margin', withSpaces ? SpaceUnit : 1, unit);

export const position = (
  sizes: Partial<ISized>,
  unit?: SizeUnits,
  cssPos?: string,
  withSpaces?: boolean
) => `
  position: ${cssPos};
  ${setSizedAttribute(sizes, undefined, withSpaces ? SpaceUnit : 1, unit)}
`;

export const themePadding = (sizes: Partial<ISized>) =>
  padding(sizes, 'px', true);

export const themeMargin = (sizes: Partial<ISized>) =>
  margin(sizes, 'px', true);

export const themePosition = (sizes: Partial<ISized>, cssPos?: string) =>
  position(sizes, 'px', cssPos, true);
