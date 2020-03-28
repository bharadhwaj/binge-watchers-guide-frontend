import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import loadingReducer from './loading.reducer';
import toastReducer from './toast.reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    toast: toastReducer,
    loading: loadingReducer,
  });

export default rootReducer;
