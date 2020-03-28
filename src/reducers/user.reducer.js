import { USER } from '../constants/actions';
import { checkIfUserIsLoggedIn } from '../utils/users';

const { isLoggedIn, userInfo } = checkIfUserIsLoggedIn();

const notLoggedInState = {
  isLoggedIn: false,
  _id: null,
  username: null,
  token: null,
};

const initialState = isLoggedIn ? userInfo : notLoggedInState;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER.UPDATE_USER_DATA:
      return {
        ...state,
        isLoggedIn: true,
        _id: action.payload.userInfo._id,
        username: action.payload.userInfo.username,
        token: action.payload.userInfo.token,
      };

    case USER.RESET_USER_DATA:
      return {
        ...notLoggedInState,
      };

    default:
      return { ...state };
  }
}
