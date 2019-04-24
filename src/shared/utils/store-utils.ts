import { inject } from 'mobx-react';
import { apiStoreHandleRequest, IStores } from 'shared/stores';
import { IHandledRequest } from 'shared/stores/api-store';

type IRequestConfig = Pick<
  IHandledRequest<any>,
  'actionName' | 'onSuccess' | 'onFail' | 'failToast' | 'successToast'
>;

/**
 * Returns a decorator to wrap store functions that make calls to an API
 * @param config Configuration for how the function should be handled pre and post request
 */
export function handleRequest(config: IRequestConfig) {
  // tslint:disable: only-arrow-functions
  return function(
    classProto: any,
    methodName: string | symbol,
    methodTarget: PropertyDescriptor
  ) {
    if (!methodTarget) {
      // tslint:disable-next-line: no-parameter-reassignment
      methodTarget = Object.getOwnPropertyDescriptor(
        classProto,
        methodName
      ) as PropertyDescriptor;
    }

    const originalMethod = methodTarget.value;

    methodTarget.value = function(...args: any) {
      return apiStoreHandleRequest({
        ...config,
        request: () => originalMethod.apply(this, args)
      });
    };

    return methodTarget;
  };
  // tslint:enable: only-arrow-functions
}

/**
 * Returns a wrapper function for a component to have connected props
 * @param injectFunction Function to return specific store state
 */
export const connectStores = (injectFunction: (stores: IStores) => object) =>
  inject<IStores, any, any, any>(injectFunction);
