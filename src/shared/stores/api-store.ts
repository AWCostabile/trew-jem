import {
  action,
  computed,
  IKeyValueMap,
  observable,
  ObservableMap
} from 'mobx';
import { createTransformer } from 'mobx-utils';
import { IToast, QueueToast } from './ui-store';

export interface IHandledRequest<Type> {
  actionName: string;
  request: () => Promise<Type>;
  onSuccess?: (result: any) => void;
  onFail?: (err: Error) => void;
  failToast?: (err: Error) => string | IToast;
  successToast?: (result: any) => string | IToast;
}

export type HandleRequest<Type> = (
  request: IHandledRequest<Type>
) => Promise<Type | undefined>;

export interface IApiStoreState {
  activeRequests: ObservableMap<string, boolean>;
}

interface IActionQuery {
  action?: string;
  actions?: string[];
}

export class ApiStore {
  queueToast: QueueToast;
  state = observable<IApiStoreState>({
    activeRequests: observable.map<string, boolean>()
  });

  areRequestsActive = createTransformer(
    ({
      action: actionName,
      actions: actionList = []
    }: IActionQuery): IKeyValueMap<boolean> =>
      [...actionList, ...(actionName ? [actionName] : [])].reduce(
        (actionStatus, actionKey) => ({
          ...actionStatus,
          [actionKey]: !!this.state.activeRequests.get(actionKey)
        }),
        {}
      )
  );

  constructor(queueToast: QueueToast) {
    this.queueToast = queueToast;
    this.init();
  }

  @computed
  get activeRequests() {
    if (!this.state) {
      return [];
    }

    return Array.from(this.state.activeRequests.entries())
      .filter(([_, value]) => !!value)
      .map(([key]) => key);
  }

  @action
  init() {
    this.state.activeRequests.clear();
  }

  @action.bound
  handleRequest = async <Type>({
    actionName,
    request,
    onFail,
    onSuccess,
    failToast,
    successToast
  }: IHandledRequest<Type>): Promise<Type | undefined> => {
    let response;
    this.setRequestStatus(actionName, true);
    try {
      response = await request();

      if (successToast) {
        successToast(response);
      }
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      if (failToast) {
        this.queueToast(failToast(error));
      }
      if (onFail) {
        onFail(error);
      }
    }

    this.setRequestStatus(actionName, false);
    return response;
  };

  @action.bound
  setRequestStatus(actionName: string, isActive: boolean) {
    this.state.activeRequests.set(actionName, isActive);
  }
}
