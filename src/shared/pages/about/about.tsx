import * as React from 'react';
import { PageContainer } from 'shared/styling/components/page.emotion';

export const AboutPage: React.SFC = () => (
  <PageContainer>
    <h1>About</h1>
    <p>
      This page servers to describe this web-starter!
      <br />
      <em># TODO: Add information to this page</em>
    </p>
  </PageContainer>
);
