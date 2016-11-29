export type Action =
  // Feed types
  { type: 'SELECT_PROFILE', profile: Object }
  // Sign types
    | { type: 'SIGNIN_REQUEST' }
    | { type: 'SIGNIN_SUCCESS', result: Object }
    | { type: 'SIGNIN_FAILURE', error: Object }

export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
export type Dispatch = (action:Action | PromiseAction | Array<Action>) => any;
