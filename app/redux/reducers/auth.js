import type { Action } from '../actions/types';
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
} from '../actions/signIn';

export type State = {
  token: String,
  user: Object,
  isFetching: Boolean,
  isAuthenticated: Boolean,
  error: Object,
}

const initialState = {
  token: '',
  user: {},
  isFetching: false,
  isAuthenticated: false,
  error: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SIGNIN_REQUEST) {
    return {
      ...state,
      isAuthenticated: false,
      isFetching: true,
    };
  }

  if (action.type === SIGNIN_SUCCESS) {
    return {
      ...state,
      isAuthenticated: true,
      isFetching: false,
      token: action.result.token,
      user: action.result.user
    };
  }

  if (action.type === SIGNIN_FAILURE) {
    return {
      ...state,
      isAuthenticated: false,
      isFetching: false,
      error: action.error
    };
  }

  return state;
}
