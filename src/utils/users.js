import { decode } from 'jsonwebtoken';

import { USER } from '../constants/storage';

export const updateUserInfo = userInfo => {
  userInfo._id && localStorage.setItem(USER.ID, userInfo._id);
  userInfo.token && localStorage.setItem(USER.TOKEN, userInfo.token);
  userInfo.username && localStorage.setItem(USER.USERNAME, userInfo.username);
};

export const updateUserLoginInfo = userInfo => {
  const decodedToken = decode(userInfo.token);
  const expiryEpoch = decodedToken && decodedToken.exp * 1000;

  localStorage.setItem(USER.IS_LOGGED_IN, 1);
  localStorage.setItem(USER.EXPIRE_AT, expiryEpoch);
  updateUserInfo(userInfo);
};

export const checkIfUserIsLoggedIn = () => {
  const isLoggedIn = +localStorage.getItem(USER.IS_LOGGED_IN);
  const expireAt = +localStorage.getItem(USER.EXPIRE_AT);

  if (expireAt && isLoggedIn === 1 && new Date(expireAt) > new Date()) {
    const userInfo = {};
    userInfo.isLoggedIn = true;
    userInfo.expireAt = +localStorage.getItem(USER.EXPIRE_AT);
    userInfo._id = localStorage.getItem(USER.ID);
    userInfo.token = localStorage.getItem(USER.TOKEN);
    userInfo.username = localStorage.getItem(USER.USERNAME);

    return { isLoggedIn: true, userInfo };
  }

  return { isLoggedIn: false, userInfo: null };
};

export const removeUserInfo = () => {
  localStorage.removeItem(USER.IS_LOGGED_IN);
  localStorage.removeItem(USER.EXPIRE_AT);
  localStorage.removeItem(USER.ID);
  localStorage.removeItem(USER.TOKEN);
  localStorage.removeItem(USER.USERNAME);
};

export const logoutUser = () => {
  removeUserInfo();
};
