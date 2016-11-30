import type { Action } from './types';
import { getUsersRequest, getUserRequest, likeRequest } from '../../helpers/api';

export const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAILURE = 'GET_FEED_FAILURE';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE  = 'GET_USER_FAILURE';
export const LIKE_USER_REQUEST = 'LIKE_USER_REQUEST';
export const LIKE_USER_SUCCESS = 'LIKE_USER_SUCCESS';
export const LIKE_USER_FAILURE = 'LIKE_USER_FAILURE';

// Using endpoints here only for demonstration.
// It's not necessary because /api/users endpoint gives full information

function requestFeed(offset: Number):Action {
  return {
    type: GET_FEED_REQUEST,
    offset,
  };
}

function receiveFeed(result: Object):Action {
  return {
    type: GET_FEED_SUCCESS,
    result
  }
}

function failFeed(error: Object):Action {
  return {
    type: GET_FEED_FAILURE,
    error
  }
}

export function getFeed(offset: Number):Action {
  return (dispatch, getState) => {
    dispatch(requestFeed(offset));
    const state = getState();

    return getUsersRequest(state.auth.token, offset)
      .then(result => {
          if (!result.body && result.body.length <= 0) {
            dispatch(failFeed(result));
            return Promise.reject(result);
          } else {
            dispatch(receiveFeed(result.body));
          }
      }).catch(err => {
        dispatch(failFeed(err));
        console.log("Error: ", err);
      });
  }
}


function requestUser(id: String):Action {
  return {
    type: GET_USER_REQUEST,
    id,
  };
}

function receiveUser(result: Object):Action {
  return {
    type: GET_USER_SUCCESS,
    result
  }
}

function failUser(error: Object):Action {
  return {
    type: GET_USER_FAILURE,
    error
  }
}

export function getUser(id: String):Action {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(requestUser(id));
    return getUserRequest(state.auth.token, id)
      .then(result => {
          if (!result.body) {
            dispatch(failUser(result));
            return Promise.reject(result);
          } else {
            dispatch(receiveUser(result.body));
          }
      }).catch(err => {
        dispatch(failUser(err));
        console.log("Error: ", err);
      });
  }
}

function requestLike(id: String):Action {
  return {
    type: LIKE_USER_REQUEST,
    id,
  };
}

function receiveLike(result: Object):Action {
  return {
    type: LIKE_USER_SUCCESS,
    result
  }
}

function failLike(error: Object):Action {
  return {
    type: LIKE_USER_FAILURE,
    error
  }
}

export function likeUser(id: String):Action {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(requestLike(id));
    return likeRequest(state.auth.token, id)
      .then(result => {
          if (!result.body) {
            dispatch(failLike(result));
            return Promise.reject(result);
          } else {
            dispatch(receiveLike(result.body));
          }
      }).catch(err => {
        dispatch(failLike(err));
        console.log("Error: ", err);
      });
  }
}
