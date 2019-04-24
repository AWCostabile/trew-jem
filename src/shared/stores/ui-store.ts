import { action, computed, IObservableArray, observable } from 'mobx';
import { isValidElement, ReactNode } from 'react';
import { TOAST_REMOVAL_DURATION, TOAST_TIMEOUT } from 'shared/constants/app';
import { v4 } from 'uuid';

export interface ILoadedToast {
  closeHandler?: () => void;
  id: string;
  icon: ReactNode;
  isQueuedForRemoval: boolean;
  shouldAutoClose: boolean;
  text: React.ReactNode;
  timeout: number;
}

export interface IToast {
  id?: string;
  icon?: ReactNode;
  shouldAutoClose?: boolean;
  text: React.ReactNode;
  timeout?: number;
}
export interface IUiStoreState {
  toasts: IObservableArray<ILoadedToast>;
}

export type QueueToast = (toast: string | IToast) => void;

export class UiStore {
  state = observable<IUiStoreState>({
    toasts: observable.array<ILoadedToast>()
  });

  @computed
  get toasts() {
    return (this.state && this.state.toasts) || [];
  }

  @action.bound
  queueToast(toastData: IToast | React.ReactNode) {
    const toast = this.transformToast(toastData);
    const { id, timeout, shouldAutoClose } = toast;

    this.state.toasts.push({
      ...toast,
      ...(shouldAutoClose ? {} : { closeHandler: () => this.queueRemoval(id) })
    });

    if (shouldAutoClose) {
      this.toastTimeout(timeout).then(() => this.queueRemoval(id));
    }
  }

  @action.bound
  queueRemoval(id: string) {
    this.state.toasts.replace(
      this.state.toasts.map(toast =>
        toast.id !== id ? toast : { ...toast, isQueuedForRemoval: true }
      )
    );

    this.toastTimeout(TOAST_REMOVAL_DURATION).then(() => this.removeToast(id));
  }

  @action.bound
  removeToast(id: string) {
    this.state.toasts.replace(
      this.state.toasts.filter(toast => toast.id !== id)
    );
  }

  transformToast = (toastData: IToast | React.ReactNode): ILoadedToast => ({
    icon: undefined,
    id: v4(),
    isQueuedForRemoval: false,
    shouldAutoClose: true,
    timeout: TOAST_TIMEOUT,
    ...(typeof toastData === 'string' || isValidElement(toastData)
      ? { text: toastData }
      : (toastData as IToast))
  });

  toastTimeout = async (delay: number) =>
    new Promise(callback => {
      setTimeout(callback, delay);
    });
}
