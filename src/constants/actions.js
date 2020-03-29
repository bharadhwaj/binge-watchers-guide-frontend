// ------------------ LOADING ACTIONS ------------------ //
export const LOADING = {
  START_CHECK_USERNAME_LOADING: 'bwg/Loading/START_CHECK_USERNAME_LOADING',
  STOP_CHECK_USERNAME_LOADING: 'bwg/Loading/STOP_CHECK_USERNAME_LOADING',
  START_REGISTER_LOADING: 'bwg/Loading/START_REGISTER_LOADING',
  STOP_REGISTER_LOADING: 'bwg/Loading/STOP_REGISTER_LOADING',
  START_LOGIN_LOADING: 'bwg/Loading/START_LOGIN_LOADING',
  STOP_LOGIN_LOADING: 'bwg/Loading/STOP_LOGIN_LOADING',
  START_ADD_SHOW_LOADING: 'bwg/Loading/START_ADD_SHOW_LOADING',
  STOP_ADD_SHOW_LOADING: 'bwg/Loading/STOP_ADD_SHOW_LOADING',
};

// ------------------ TOAST ACTIONS ------------------ //
export const TOAST = {
  REQUEST_TO_SHOW_TOAST: 'bwg/Toast/REQUEST_TO_SHOW_TOAST',
  SHOW_TOAST: 'bwg/Toast/SHOW_TOAST',
  HIDE_TOAST: 'bwg/Toast/HIDE_TOAST',
};

// ------------------ REGISTER ACTIONS ------------------ //
export const REGISTER = {
  CHECK_USERNAME: 'bwg/Register/CHECK_USERNAME',
  REGISTER_USER: 'bwg/Register/REGISTER_USER',
};

// ------------------ LOGIN ACTIONS ------------------ //
export const LOGIN = {
  SUBMIT_FOR_LOGIN: 'bwg/Login/SUBMIT_FOR_LOGIN',
  RESET_LOGIN_STATE: 'bwg/Login/RESET_LOGIN_STATE',
};

// ------------------ USER ACTIONS ------------------ //
export const USER = {
  UPDATE_USER_DATA: 'bwg/User/UPDATE_USER_DATA',
  RESET_USER_DATA: 'bwg/User/RESET_USER_DATA',
};

// ------------------ STATIC ACTIONS ------------------ //
export const STATIC = {
  GET_ALL_STATICS: 'bwg/Static/GET_ALL_STATICS',
  UPDATE_TYPE_DATA: 'bwg/Static/UPDATE_TYPE_DATA',
  UPDATE_LANGUAGE_DATA: 'bwg/Static/UPDATE_LANGUAGE_DATA',
  UPDATE_GENRE_DATA: 'bwg/Static/UPDATE_GENRE_DATA',
};

// ------------------ SHOWS ACTIONS ------------------ //
export const SHOWS = {
  GET_ALL_SHOWS: 'bwg/Shows/GET_ALL_SHOWS',
  ADD_SHOWS: 'bwg/Shows/ADD_SHOWS',
};
