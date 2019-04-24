import { observer } from 'mobx-react';
import * as React from 'react';
import { ColourBlock } from 'shared/components/ui/colour-block';
import { UiStore } from 'shared/stores/ui-store';
import {
  Button,
  ButtonContainer
} from 'shared/styling/components/button.emotion';
import { PageContainer } from 'shared/styling/components/page.emotion';
import { Palette } from 'shared/styling/variables';
import { connectStores } from 'shared/utils/store-utils';

interface ILoginPageConnectedProps extends Pick<UiStore, 'queueToast'> {
  logoutHandler: () => void;
}

class DashboardPage extends React.Component {
  get connectedProps() {
    return this.props as ILoginPageConnectedProps;
  }

  componentDidMount() {
    this.connectedProps.queueToast(
      <ColourBlock
        text={[
          ['Logged in successfully at'],
          [new Date().toTimeString().replace(/ .*/g, ''), Palette.Grey[88]]
        ]}
      />
    );
  }

  render() {
    return (
      <PageContainer>
        <h1>My Dashboard</h1>
        <p>
          Build a dashboard page under
          <br />
          <em>shared/pages/dashboard</em>
        </p>
        <ButtonContainer>
          <Button onClick={this.connectedProps.logoutHandler}>Log Out</Button>
        </ButtonContainer>
      </PageContainer>
    );
  }
}

const ConnectedDashboardPage = connectStores(
  ({ authStore: { onLogOut }, uiStore: { queueToast } }) => ({
    logoutHandler: onLogOut,
    queueToast
  })
)(observer(DashboardPage));

export { ConnectedDashboardPage as DashboardPage };
