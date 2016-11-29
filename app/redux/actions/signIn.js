import type { Action } from './types';
import { signInRequest } from '../../helpers/api';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

function requestSignIn():Action {
  return {
    type: SIGNIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  };
}

function receiveToken(result: Object):Action {
  return {
    type: SIGNIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    result
  }
}

function signInError(error: Object):Action {
  return {
    type: SIGNIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error
  }
}

export function signIn(creds: Object):Action {
  return dispatch => {
    dispatch(requestSignIn());

    return signInRequest(creds.cellphone, creds.password)
      .then(result => {
          if (!result.body.token) {
            dispatch(signInError(result));
            return Promise.reject(result);
          } else {
            dispatch(receiveToken(result.body));
          }
      }).catch(err => console.log("Error: ", err));
  }
}
