import { AppDispatch, State } from './../types/state';
import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
