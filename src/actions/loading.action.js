import { LOADING } from '../constants/actions';

export function startRegisterLoading() {
  return { type: LOADING.START_REGISTER_LOADING };
}

export function stopRegisterLoading() {
  return { type: LOADING.STOP_REGISTER_LOADING };
}

export function startLoginLoading() {
  return { type: LOADING.START_LOGIN_LOADING };
}

export function stopLoginLoading() {
  return { type: LOADING.STOP_LOGIN_LOADING };
}

export function startAddShowLoading() {
  return { type: LOADING.START_ADD_SHOW_LOADING };
}

export function stopAddShowLoading() {
  return { type: LOADING.STOP_ADD_SHOW_LOADING };
}
