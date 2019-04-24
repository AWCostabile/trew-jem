import styled from 'react-emotion';
import { TOAST_REMOVAL_DURATION } from 'shared/constants/app';
import { ILoadedToast } from 'shared/stores/ui-store';
import {
  themeMargin,
  themePadding,
  themePosition
} from 'shared/styling/utils/helpers';
import { Palette, SpaceUnit, ZIndexes } from 'shared/styling/variables';

interface IToastContainerProps {
  placement?: {
    x?: 'top' | 'bottom';
    y?: 'left' | 'right';
  };
}

export const ToastContainer = styled('div')<IToastContainerProps>`
  ${themePosition({ right: 4, bottom: 4 }, 'absolute')}
  z-index: ${ZIndexes.toasts};
  height: 0;
  width: auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: right;
`;

export const ToastItem = styled('div')<Partial<ILoadedToast>>`
  ${themePadding({ x: 2, y: 1 })}
  ${themeMargin({ y: 0.5 })}

  background: ${Palette.Grey[44]};
  box-shadow: 0 3px 6px ${Palette.Grey[44]};
  border-radius: ${SpaceUnit * 0.5}px;
  color: ${Palette.Grey.F2};

  transition: opacity ${TOAST_REMOVAL_DURATION / 1000}s;
  opacity: ${({ isQueuedForRemoval }) => (isQueuedForRemoval ? 0 : 1)};
`;
