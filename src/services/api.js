import axios from 'axios';

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

const HttpStatus = {
  UNAUTHORIZED: 401,
};

export const createApi = (onError, errorStatus) => {

  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === errorStatus) {
      onError();
      throw err;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
