export type Action =
  // Feed types
  { type: 'SELECT_PROFILE', profile: Object }
    | { type: 'GET_FEED_REQUEST', offset: Number }
    | { type: 'GET_FEED_SUCCESS', result: Array }
    | { type: 'GET_FEED_FAILURE', error: Object }
    | { type: 'GET_USER_REQUEST', id: String }
    | { type: 'GET_USER_SUCCESS', result: Object }
    | { type: 'GET_USER_FAILURE', error: Object }
    | { type: 'LIKE_USER_REQUEST', id: String }
    | { type: 'LIKE_USER_SUCCESS', result: Object }
    | { type: 'LIKE_USER_FAILURE', error: Object }
    | { type: 'FLUSH_FEED' }
  // Sign types
    | { type: 'SIGNIN_REQUEST' }
    | { type: 'SIGNIN_SUCCESS', result: Object }
    | { type: 'SIGNIN_FAILURE', error: Object }
    | { type: 'SIGN_OUT' }

export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
export type Dispatch = (action:Action | PromiseAction | Array<Action>) => any;
