import { observer } from 'mobx-react';
import * as React from 'react';
import { Toasts } from 'shared/components/ui/toasts';
import { LoginLayout } from 'shared/layouts/login';
import { MainLayout } from 'shared/layouts/main';
import { RouteManager } from 'shared/routing';
import { IToast } from 'shared/stores/ui-store';
import { connectStores } from 'shared/utils/store-utils';
import { AppLayoutContainer } from './app-layout.emotion';

interface IAppLayoutProps {
  setStatus?: (code: number) => void;
}

interface IAppLayoutConnectedProps extends IAppLayoutProps {
  isLoggedIn: boolean;
  toasts: IToast[];
}

const AppLayout: React.SFC<IAppLayoutProps> = props => {
  const { isLoggedIn, setStatus } = props as IAppLayoutConnectedProps;

  return (
    <AppLayoutContainer>
      <RouteManager
        isLoggedIn={isLoggedIn}
        privateLayout={MainLayout}
        publicLayout={LoginLayout}
        setStatus={setStatus}
      />
      <Toasts />
    </AppLayoutContainer>
  );
};

const ConnectedAppLayout = connectStores(({ authStore: { isLoggedIn } }) => ({
  isLoggedIn
}))(observer(AppLayout));

export { ConnectedAppLayout as AppLayout };
