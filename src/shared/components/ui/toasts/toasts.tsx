import { observer } from 'mobx-react';
import * as React from 'react';
import { ILoadedToast } from 'shared/stores/ui-store';
import { connectStores } from 'shared/utils/store-utils';
import { Toast } from './toast';
import { ToastContainer } from './toasts.emotion';

interface IToastContainerConnectedProps {
  toasts: ILoadedToast[];
}

class Toasts extends React.Component {
  get connectedProps() {
    return this.props as IToastContainerConnectedProps;
  }

  render() {
    const { toasts } = this.connectedProps;

    return (
      <ToastContainer>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </ToastContainer>
    );
  }
}

const ConnectedToasts = connectStores(({ uiStore: { toasts } }) => ({
  toasts
}))(observer(Toasts));

export { ConnectedToasts as Toasts };
