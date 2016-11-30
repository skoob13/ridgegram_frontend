import Frisbee from 'frisbee';
import config from '../config';

const api = new Frisbee({
  baseURI: config.apiURI,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
});

function signInRequest(cellphone, password) {
  return api.post('/signin', {
    body: {
      cellphone: cellphone,
      password: password,
    }
  })
}

function signUpRequest(user) {
  return api.post('/signup', {
    body: {
      ...user,
    }
  })
}

export {
  signInRequest,
  signUpRequest
};
