import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PasswordInput, TextInput } from 'shared/components/ui/input';
import { AuthStore } from 'shared/stores/auth-store';
import {
  Button,
  ButtonContainer
} from 'shared/styling/components/button.emotion';
import { PageContainer } from 'shared/styling/components/page.emotion';
import { connectStores } from 'shared/utils/store-utils';
import { LoginForm } from './login-page.emotion';

interface ILoginPageConnectedProps extends RouteComponentProps {
  loginHandler: AuthStore['onLoginAttempt'];
}

interface ILoginPageState {
  username: string;
  password: string;
}

class LoginPage extends React.Component<RouteComponentProps> {
  state: ILoginPageState = {
    password: '',
    username: ''
  };

  get connectedProps() {
    return this.props as ILoginPageConnectedProps;
  }

  get canSubmit() {
    const { username, password } = this.state;

    return !!username && !!password;
  }

  submitHandler = async () => {
    if (!this.canSubmit) {
      return;
    }

    const { history, loginHandler } = this.connectedProps;

    const loggedIn = await loginHandler(this.state);

    if (loggedIn) {
      history.push('/');
    }
  };

  changeHandler = (key: keyof ILoginPageState, evt: any) => {
    if (!evt || !evt.target || !evt.target.value) {
      return;
    }

    this.setState({
      [key]: evt.target.value
    });
  };

  render() {
    const { password, username } = this.state;

    return (
      <PageContainer>
        <h1>Login Page</h1>
        <p>
          Build a login page under
          <br />
          <em>shared/pages/login</em>
        </p>
        <LoginForm>
          <TextInput
            name="username"
            placeholder="Enter a username"
            onChange={this.changeHandler.bind(this, 'username')}
            value={username}
          />
          <PasswordInput
            name="password"
            placeholder="Enter a password"
            onChange={this.changeHandler.bind(this, 'password')}
            value={password}
          />
        </LoginForm>
        <ButtonContainer>
          <Button onClick={this.submitHandler} disabled={!this.canSubmit}>
            Log In
          </Button>
        </ButtonContainer>
      </PageContainer>
    );
  }
}

const ConnectedLoginPage = connectStores(
  ({ authStore: { onLoginAttempt } }) => ({
    loginHandler: onLoginAttempt
  })
)(LoginPage);

export { ConnectedLoginPage as LoginPage };
