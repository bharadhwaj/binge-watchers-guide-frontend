import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import loadingReducer from './loading.reducer';
import showsReducer from './shows.reducer';
import staticReducer from './static.reducer';
import toastReducer from './toast.reducer';
import userReducer from './user.reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    toast: toastReducer,
    loading: loadingReducer,
    static: staticReducer,
    user: userReducer,
    shows: showsReducer,
  });

export default rootReducer;
