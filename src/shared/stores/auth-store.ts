import { action, computed, observable, runInAction } from 'mobx';
import * as authApi from 'shared/api/auth';
import { API_EXPIRY, API_TOKEN } from 'shared/constants/app';
import { IAuthProps } from 'shared/types/auth';
import { Cookies } from 'shared/utils/cookies';

// import { handleRequest } from 'shared/utils/store-utils';

interface IAuthStoreState {
  isLoggedIn: boolean;
}

export class AuthStore {
  state: IAuthStoreState = observable({
    isLoggedIn: false
  });

  constructor() {
    this.state.isLoggedIn = !!this.cookieData();
  }

  cookieData() {
    const { id, username, ...cookie } = Cookies.getAll();
    const expiry = Number(cookie[API_EXPIRY]);
    const token = cookie[API_TOKEN];

    if (!token || isNaN(expiry) || expiry * 1000 < new Date().valueOf()) {
      return;
    }

    return {
      ...cookie,
      expiry,
      token
    };
  }

  @computed
  get isLoggedIn(): boolean {
    return this.state.isLoggedIn;
  }

  @action.bound
  async onLoginAttempt(auth: IAuthProps) {
    const data = await authApi.login(auth);

    if (!data || !data[API_TOKEN]) {
      return false;
    }

    Cookies.set('id', data.id);
    Cookies.set('username', auth.username);
    Cookies.set(API_TOKEN, data[API_TOKEN]);
    Cookies.set(API_EXPIRY, data[API_EXPIRY]);

    runInAction(`State`, () => {
      this.state.isLoggedIn = true;
    });

    return true;
  }

  @action.bound
  onLogOut() {
    Cookies.remove('id');
    Cookies.remove('username');
    Cookies.remove(API_EXPIRY);
    Cookies.remove(API_TOKEN);
    this.state.isLoggedIn = false;
  }
}
