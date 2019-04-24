import * as React from 'react';
import {
  Button,
  ButtonContainer
} from 'shared/styling/components/button.emotion';
import { PageContainer } from 'shared/styling/components/page.emotion';
import { connectStores } from 'shared/utils/store-utils';

interface ILoginPageConnectedProps {
  loginHandler: () => void;
}

const LoginPage: React.SFC = props => {
  const { loginHandler } = props as ILoginPageConnectedProps;
  return (
    <PageContainer>
      <h1>Login Page</h1>
      <p>
        Build a login page under
        <br />
        <em>shared/pages/login</em>
      </p>
      <ButtonContainer>
        <Button onClick={loginHandler}>Log In</Button>
      </ButtonContainer>
    </PageContainer>
  );
};

const ConnectedLoginPage = connectStores(({ authStore: { onLogIn } }) => ({
  loginHandler: onLogIn
}))(LoginPage);

export { ConnectedLoginPage as LoginPage };
