import axiosOrigin, { AxiosError, AxiosRequestConfig } from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';

import PortainerError from '../error';
import { get as localStorageGet } from '../hooks/useLocalStorage';

import {
  portainerAgentManagerOperation,
  portainerAgentTargetHeader,
} from './http-request.helper';

const axios = axiosOrigin.create({ baseURL: 'http://localhost:9000/api' });

loadProgressBar(undefined, axios);

export default axios;

axios.interceptors.request.use(async (config) => {
  const newConfig = { headers: config.headers || {}, ...config };

  const jwt = localStorageGet('JWT', '');
  if (jwt) {
    newConfig.headers.Authorization = `Bearer ${jwt}`;
  }

  return newConfig;
});

export function agentInterceptor(config: AxiosRequestConfig) {
  if (!config.url || !config.url.includes('/docker/')) {
    return config;
  }

  const newConfig = { headers: config.headers || {}, ...config };
  const target = portainerAgentTargetHeader();
  if (target) {
    newConfig.headers['X-PortainerAgent-Target'] = target;
  }

  if (portainerAgentManagerOperation()) {
    newConfig.headers['X-PortainerAgent-ManagerOperation'] = '1';
  }

  return newConfig;
}

axios.interceptors.request.use(agentInterceptor);

export function parseAxiosError(
  err: Error,
  msg = '',
  parseError = defaultErrorParser
) {
  let resultErr = err;
  let resultMsg = msg;

  if ('isAxiosError' in err) {
    const { error, details } = parseError(err as AxiosError);
    resultErr = error;
    resultMsg = msg ? `${msg}: ${details}` : details;
  }

  return new PortainerError(resultMsg, resultErr);
}

function defaultErrorParser(axiosError: AxiosError) {
  const message = axiosError.response?.data.message;
  const details = axiosError.response?.data.details || message;
  const error = new Error(message);
  return { error, details };
}
