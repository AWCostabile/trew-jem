import { hydrate } from 'emotion';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'shared/constants/statics'; // Forces all statics to be built
import { AppLayout } from 'shared/layouts/app';
import { createStores } from 'shared/stores';

const { __EMOTION_CSS__ = [], __INITIAL_STATE__ = {} } = global.window;
const stores = createStores(__INITIAL_STATE__);

hydrate(__EMOTION_CSS__);

ReactDOM.hydrate(
  <Provider {...stores}>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </Provider>,
  global.document.getElementById('root')
);

declare let module: any;

if (DEVELOPMENT && module.hot) {
  module.hot.accept();
}
