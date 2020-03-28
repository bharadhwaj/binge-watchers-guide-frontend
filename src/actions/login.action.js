import { LOGIN } from '../constants/actions';

export function submitForLogin(username, password) {
  return { type: LOGIN.SUBMIT_FOR_LOGIN, payload: { username, password } };
}

export function resetLoginState() {
  return { type: LOGIN.RESET_LOGIN_STATE };
}
