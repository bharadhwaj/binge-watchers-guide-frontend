const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const CHECK_USERNAME = `${BASE_URL}/users/username/<USER_NAME>`;
export const REGISTER_URL = `${BASE_URL}/users`;
export const LOGIN_URL = `${BASE_URL}/users/auth`;

export const GET_STATICS = `${BASE_URL}/shows/statics`;

export const GET_ALL_SHOWS = `${BASE_URL}/shows`;
export const ADD_SHOWS = `${BASE_URL}/users/<USER_ID>/shows`;
