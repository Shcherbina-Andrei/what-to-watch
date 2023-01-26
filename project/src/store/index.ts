import { redirect } from './middlewares/redirect';
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createApi} from '../services/api';
const api = createApi();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect)
});

export {store};
