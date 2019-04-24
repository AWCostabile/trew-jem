import { resolve } from 'path';

// Derive development status from process.env
(global as any).DEVELOPMENT = process.env.NODE_ENV !== 'production';

// tslint:disable-next-line: no-var-requires
const env = require('../bundling/env')(resolve(__dirname, '..'), DEVELOPMENT);

// Set other globals based on selected .env file
(global as any).APP_LOGO = `static/logo-${env.ENVIRONMENT}.png`;
(global as any).BASE_URL = env.BASE_URL;
(global as any).LOCAL_BUILD = env.LOCAL_BUILD === 'true';
