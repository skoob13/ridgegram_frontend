import Frisbee from 'frisbee';
import config from '../config';

const options = {
  baseURI: config.apiURI,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
const api = new Frisbee(options);

function jwtFrisbee(token) {
  const opt = options;
  opt.headers.Authorization = `JWT ${token}`;
  return new Frisbee(opt);
}

function signInRequest(cellphone, password) {
  return api.post('/signin', {
    body: {
      cellphone,
      password,
    },
  });
}

function signUpRequest(user) {
  return api.post('/signup', {
    body: {
      ...user,
    },
  });
}

function getUsersRequest(token, offset = 0) {
  const _api = jwtFrisbee(token);
  return _api.get('/users', {
    body: {
      offset,
    },
  });
}

function getUserRequest(token, id) {
  const _api = jwtFrisbee(token);
  return _api.get(`/user/${id}`);
}

function likeRequest(token, id) {
  const _api = jwtFrisbee(token);
  return _api.post('/user/like', {
    body: {
      id,
    },
  });
}

export {
  signInRequest,
  signUpRequest,
  getUserRequest,
  getUsersRequest,
  likeRequest,
};
