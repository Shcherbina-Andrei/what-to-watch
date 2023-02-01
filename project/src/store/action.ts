import {AppRoute} from './../const';
import {createAction} from '@reduxjs/toolkit';

export const redirectToRouteAction = createAction<AppRoute>('app/redirectToRoute');

