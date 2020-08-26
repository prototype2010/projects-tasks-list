export interface AnyPayload {
  [extraProps: string]: any;
}

type Payload = AnyPayload;

export type CustomAction<P = Payload> = {
  type: string;
  payload: P;
  actionCreator: AsyncActionCreator<P>;
};

const makeActionDefault = <P = Payload>(payload?: P): AnyPayload => ({ type: '', payload });

export const POSTFIX = {
  request: '/REQUEST',
  success: '/SUCCESS',
  failure: '/FAILURE',
};

type SyncActionCreatorType<P = any> = (payload?: P) => CustomAction<P>;
type AsyncActionCreatorType<P = any> = (payload?: NonNullable<P> ) => CustomAction<P>;
type SyncPostfixType = { type: string };
type AsyncPostfixType = typeof POSTFIX;

export type SyncActionCreator<P = any> = SyncActionCreatorType<P> & SyncPostfixType;
export type AsyncActionCreator<P = any> = AsyncActionCreatorType<P> & AsyncPostfixType;

export const asyncAction = <P = Payload>(type: string, makeAction = makeActionDefault): AsyncActionCreator<P> => {
  const actionCreator = function actionCreator(payload?: P) {
    const action = {
      ...makeAction(payload),
      type: `${type}${POSTFIX.request}`,
    };

    Object.defineProperty(action, 'actionCreator', {
      value: actionCreator,
      enumerable: false,
    });

    return action as CustomAction<P>;
  };

  actionCreator.request = `${type}${POSTFIX.request}`;
  actionCreator.success = `${type}${POSTFIX.success}`;
  actionCreator.failure = `${type}${POSTFIX.failure}`;
  return actionCreator;
};

export const syncAction = <P = Payload>(type: string, makeAction = makeActionDefault): SyncActionCreator<P> => {
  const actionCreator = function actionCreator(payload?: P) {
    const action = {
      ...makeAction(payload),
      type,
    };

    Object.defineProperty(action, 'actionCreator', {
      value: actionCreator,
      enumerable: false,
    });

    return action as CustomAction<P>;
  };

  actionCreator.type = type;
  return actionCreator;
};
