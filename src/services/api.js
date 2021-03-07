import axios from 'axios';
import {snakeToCamelAdapter} from './utilities';
import history from '../browser-history';
import {ErrorStatus, AppPaths} from '../constants';

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

export const createApi = (onError, errorStatus) => {

  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => {
    response.data = snakeToCamelAdapter(response.data);
    return response;
  };

  const onFail = (err) => {

    const {response} = err;

    if (response.status === errorStatus) {
      onError();
      throw err;
    }
    if (response.status === ErrorStatus.NOT_FOUND) {
      history.push(AppPaths.NOT_FOUND);
      throw err;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export const simpleApi = createApi();
