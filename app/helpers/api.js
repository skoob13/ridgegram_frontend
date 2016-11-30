import Frisbee from 'frisbee';
import config from '../config';

const options = {
  baseURI: config.apiURI,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
};
const api = new Frisbee(options);

function jwtFrisbee(token) {
  const opt = options;
  opt.headers['Authorization'] = "JWT " + token;
  return new Frisbee(opt);
}

function signInRequest(cellphone, password) {
  return api.post('/signin', {
    body: {
      cellphone: cellphone,
      password: password,
    }
  });
}

function signUpRequest(user) {
  return api.post('/signup', {
    body: {
      ...user,
    }
  });
}

function getUsersRequest(token, offset = 0) {
  const api = jwtFrisbee(token);
  return api.get('/users', {
    body: {
      offset: offset,
    }
  });
}

function getUserRequest(token, id) {
  const api = jwtFrisbee(token);
  return api.get('/user/' + id);
}

function likeRequest(token, id) {
  const api = jwtFrisbee(token);
  return api.post('/user/like', {
    body: {
      id: id,
    }
  });
}

export {
  signInRequest,
  signUpRequest,
  getUserRequest,
  getUsersRequest,
  likeRequest
};
