import { REHYDRATE } from 'redux-persist/constants';
import type { Action } from '../actions/types';
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGN_OUT
} from '../actions/auth';

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
  isRehydrated: false,
  error: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === REHYDRATE) {
    // Checking if payload exists
    const auth = action.payload.auth;
    if (auth) {
      return {
        ...state,
        isRehydrated: true,
        isFetching: false,
        isAuthenticated: auth.isAuthenticated,
        token: auth.token,
        user: auth.user,
        error: {},
      };
    }

    // Auth payload not loaded, so install initial state
    return {
      ...state,
      isRehydrated: true,
    }
  }

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

  if (action.type === SIGN_OUT) {
    return {
      initialState
    }
  }

  return state;
}
