import { injectGlobal } from 'emotion';
import { FontSize } from './variables';

// tslint:disable-next-line: no-default-export
export default injectGlobal`
  html, body, #root {
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
    font-size: ${FontSize.body_1};
    margin: 0;
    height: 100%;
    width: 100%;
  }
`;
