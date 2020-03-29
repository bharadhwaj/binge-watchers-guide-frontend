import { REGISTER } from '../constants/actions';

export function checkUsername(username) {
  return { type: REGISTER.CHECK_USERNAME, payload: { username } };
}

export function registerUser(username, password) {
  return { type: REGISTER.REGISTER_USER, payload: { username, password } };
}
