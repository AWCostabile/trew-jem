import { ApiStore, HandleRequest } from './api-store';
import { AuthStore } from './auth-store';
import { UiStore } from './ui-store';

export let apiStoreHandleRequest: HandleRequest<any>;

export interface IStores {
  apiStore: ApiStore;
  authStore: AuthStore;
  uiStore: UiStore;
}

export const createStores = (initialState = {}): IStores => {
  const uiStore = new UiStore();
  const apiStore = new ApiStore(uiStore.queueToast);

  apiStoreHandleRequest = apiStore.handleRequest;

  const authStore = new AuthStore();

  return {
    apiStore,
    authStore,
    uiStore
  };
};
