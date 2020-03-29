import { LOADING } from '../constants/actions';

const initialState = {
  isCheckUsernameLoading: false,
  isRegisterSubmitLoading: false,
  isLoginSubmitLoading: false,
  isAddShowSubmitLoading: false,
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING.START_CHECK_USERNAME_LOADING:
      return {
        ...state,
        isCheckUsernameLoading: true,
      };

    case LOADING.STOP_CHECK_USERNAME_LOADING:
      return {
        ...state,
        isCheckUsernameLoading: false,
      };

    case LOADING.START_REGISTER_LOADING:
      return {
        ...state,
        isRegisterSubmitLoading: true,
      };

    case LOADING.STOP_REGISTER_LOADING:
      return {
        ...state,
        isRegisterSubmitLoading: false,
      };

    case LOADING.START_LOGIN_LOADING:
      return {
        ...state,
        isLoginSubmitLoading: true,
      };

    case LOADING.STOP_LOGIN_LOADING:
      return {
        ...state,
        isLoginSubmitLoading: false,
      };

    case LOADING.START_ADD_SHOW_LOADING:
      return {
        ...state,
        isAddShowSubmitLoading: true,
      };

    case LOADING.STOP_ADD_SHOW_LOADING:
      return {
        ...state,
        isAddShowSubmitLoading: false,
      };

    default:
      return { ...state };
  }
}
