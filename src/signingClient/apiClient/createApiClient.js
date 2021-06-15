import request, { CancelToken } from '../request';

const createApiClient = function createApiClient() {
  const get = function get(settings = {}) {
    return request({
      method: 'get',
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
      ...settings,
    });
  };

  const post = function post(settings = {}) {
    return request({
      method: 'post',
      cache: 'no-cache',
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
      ...settings,
    });
  };

  return Object.freeze({
    get,
    post,
    CancelToken,
  });
};

export default createApiClient;
