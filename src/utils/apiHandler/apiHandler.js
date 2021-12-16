// import { put } from 'redux-saga/effects';
import axios from '../../http/axios/axios_main';
// import { logout } from '../../store/actions';

export default function* errorHandler({
  endpoint,
  successHandler,
  failHandler,
  payload = {},
  apiType = '',
  token = '',
}) {
  if (apiType.trim() === '') {
    throw new Error('apiType is require');
  }
  try {
    let response;
    if (token === '') {
      if (apiType === 'get') {
        response = yield axios.get(endpoint);
      } else if (apiType === 'post') {
        console.log('Payload in apiHandler', payload);
        response = yield axios.post(endpoint, payload);
      } else if (apiType === 'put') {
        response = yield axios.put(endpoint, payload);
      } else if (apiType === 'delete') {
        response = yield axios.delete(endpoint);
      }
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // eslint-disable-next-line no-lonely-if
      if (apiType === 'get') {
        response = yield axios.get(endpoint, config);
      } else if (apiType === 'post') {
        response = yield axios.post(endpoint, payload, config);
      } else if (apiType === 'put') {
        response = yield axios.put(endpoint, payload, config);
      } else if (apiType === 'delete') {
        response = yield axios.delete(endpoint, config);
      }
    }
    if (
      response
      && response.status === 200
      && response.data
      && response.data.result
      && response.data.result === 1
    ) {
      yield successHandler(response.data);
    } else if (response !== undefined && response.status !== undefined) {
      if (
        response.data.msg !== undefined
        && response.data.msg !== ''
        && typeof response.data.msg === 'string'
      ) {
        yield failHandler(response.data.msg);
      } else {
        yield failHandler('Server error! Please try again.');
      }
    } else {
      yield failHandler('Something went wrong! Please try again.');
    }
  } catch (error) {
    if (
      error !== undefined
      && error.response !== undefined
      && error.response.status !== undefined
    ) {
      if (error.response.status === 400) {
        yield failHandler(error.response.data.msg);
      }
      if (error.response.status === 401) {
        // yield put(logout());
      } else if (
        error.response.data.msg !== undefined
        && error.response.data.msg !== ''
        && typeof error.response.data.msg === 'string'
      ) {
        yield failHandler(error.response.data.msg);
      } else {
        yield failHandler('Server error! Please try again.');
      }
    } else {
      yield failHandler('Something went wrong! Please try again.');
    }
  }
}
