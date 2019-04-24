import { action, computed, observable } from 'mobx';
// import { handleRequest } from 'shared/utils/store-utils';

interface IAuthStoreState {
  isLoggedIn: boolean;
}

export class AuthStore {
  state: IAuthStoreState = observable({
    isLoggedIn: false
  });

  @computed
  get isLoggedIn(): boolean {
    return this.state.isLoggedIn;
  }

  @action.bound
  onLogIn() {
    this.state.isLoggedIn = true;
  }

  @action.bound
  onLogOut() {
    this.state.isLoggedIn = false;
  }
}
