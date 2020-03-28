import { REGISTER } from '../constants/actions';

export function registerUser(username, password) {
  return { type: REGISTER.REGISTER_USER, payload: { username, password } };
}
