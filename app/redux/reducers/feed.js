import type { Action } from '../actions/types';
import {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LIKE_USER_REQUEST,
  LIKE_USER_SUCCESS,
  LIKE_USER_FAILURE,
  FLUSH_FEED,
} from '../actions/feed';

export type State = {
  data: Array,
  offset: Number,
  isFetching: Boolean,
  error: Object,
  fetchedUser: Object,
  isFetchingUser: Boolean,
  isFetchingLikes: Boolean,
  hasMoreUsers: Boolean,
}

const initialState = {
  data: [],
  offset: 0,
  isFetching: false,
  error: {},
  fetchedUser: {},
  isFetchingUser: false,
  isFetchingLikes: false,
  hasMoreUsers: true,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === GET_FEED_REQUEST) {
    return {
      ...state,
      offset: action.offset,
      isFetching: true,
    };
  }

  if (action.type === GET_FEED_SUCCESS) {
    // If offset is zero, app doesn't append previous array
    if (state.offset === 0) {
      return {
        ...state,
        isFetching: false,
        data: action.result,
      };
    }

    return {
      ...state,
      isFetching: false,
      data: state.data.concat(action.result),
      hasMoreUsers: action.result.length > 0,
    };
  }

  if (action.type === GET_FEED_FAILURE) {
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  }

  if (action.type === GET_USER_REQUEST) {
    return {
      ...state,
      isFetchingUser: true,
    };
  }

  if (action.type === GET_USER_SUCCESS) {
    return {
      ...state,
      isFetchingUser: false,
      fetchedUser: action.result,
    };
  }

  if (action.type === GET_USER_FAILURE) {
    return {
      ...state,
      isFetchingUser: false,
      error: action.error,
    };
  }

  if (action.type === LIKE_USER_REQUEST) {
    return {
      ...state,
      isFetchingLikes: true,
    };
  }

  if (action.type === LIKE_USER_SUCCESS) {
    const user = state.fetchedUser;
    user.avatar.likesCount = action.result.likesCount;
    return {
      ...state,
      isFetchingLikes: false,
      fetchedUser: user,
    };
  }

  if (action.type === LIKE_USER_FAILURE) {
    return {
      ...state,
      isFetchingLikes: false,
      error: action.error,
    };
  }

  if (action.type === FLUSH_FEED) {
    return initialState;
  }

  return state;
}
