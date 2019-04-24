import * as React from 'react';
import { ILoadedToast } from 'shared/stores/ui-store';
import { ToastItem } from './toasts.emotion';

export const Toast: React.SFC<ILoadedToast> = ({
  icon,
  isQueuedForRemoval,
  text
}) => (
  <ToastItem isQueuedForRemoval={isQueuedForRemoval}>
    <div>{icon}</div>
    <div>{text}</div>
  </ToastItem>
);
