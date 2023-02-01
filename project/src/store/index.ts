import {redirect} from './middlewares/redirect';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
import {createApi} from '../services/api';
const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect)
});

export {store};
