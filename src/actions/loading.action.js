import { LOADING } from '../constants/actions';

export function startGetStaticsLoading() {
  return { type: LOADING.START_GET_STATICS_LOADING };
}

export function stopGetStaticsLoading() {
  return { type: LOADING.STOP_GET_STATICS_LOADING };
}

export function startGetAllShowsLoading() {
  return { type: LOADING.START_GET_ALL_SHOWS_LOADING };
}

export function stopGetAllShowsLoading() {
  return { type: LOADING.STOP_GET_ALL_SHOWS_LOADING };
}

export function startCheckUsernameLoading() {
  return { type: LOADING.START_CHECK_USERNAME_LOADING };
}

export function stopCheckUsernameLoading() {
  return { type: LOADING.STOP_CHECK_USERNAME_LOADING };
}

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

export function startVoteShowLoading() {
  return { type: LOADING.START_VOTE_SHOW_LOADING };
}

export function stopVoteShowLoading() {
  return { type: LOADING.STOP_VOTE_SHOW_LOADING };
}
