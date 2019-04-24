import { APP_TITLE } from 'shared/constants/app';
import { LOGO_IMAGE } from 'shared/constants/statics';
import * as PackageJson from '../../../package.json';

interface IToHtmlProps {
  css?: string;
  files?: string[];
  html: string;
  ids?: string[];
  language?: string;
  state?: object;
  title?: string;
}

export const ToHtml = ({
  css,
  files = [],
  html = '',
  ids = [],
  language = 'en',
  state = {},
  title = APP_TITLE || PackageJson.name
}: IToHtmlProps): string => {
  const htmlString = `
  <html lang="${language}">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="icon" href="${LOGO_IMAGE}" type="image/png" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
      <title>${title}</title>
      ${
        css ? `<style>${css}</style>\n    ` : ''
      }<script>window.__EMOTION_CSS__ = ${JSON.stringify(ids)}</script>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
    </head>
    <body>
      <div id="root">${html}</div>${files
    .map(
      file => `
        <script type="text/javascript" src="/assets/${file}.bundle.js"></script>`
    )
    .join('')}
    </body>
  </html>
  `;

  return `<!DOCTYPE html>${htmlString}`;
};
