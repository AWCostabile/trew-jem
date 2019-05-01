import { extractCritical } from 'emotion-server';
import { Provider, useStaticRendering } from 'mobx-react';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ToHtml } from 'server/html';
import { IServerRequest, IServerResponse } from 'server/types/general';
import { AppLayout } from 'shared/layouts/app';
import { createStores } from 'shared/stores';
import 'shared/styling/global-styles';

useStaticRendering(true);

export const ServeRequest = ({
  initialState = {},
  url
}: IServerRequest): IServerResponse => {
  const context = {};
  const stores = createStores(initialState);
  const next = {
    status: 200
  };

  const AppResult = (
    <Provider {...stores}>
      <StaticRouter context={context} location={url}>
        <AppLayout
          setStatus={(code: number) => {
            next.status = code;
          }}
        />
      </StaticRouter>
    </Provider>
  );

  return {
    ...next,
    data: ToHtml({
      files: ['vendor', 'client'],
      state: initialState,
      ...extractCritical(renderToString(AppResult))
    })
  };
};
