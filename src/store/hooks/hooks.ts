import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from '..';

export const Dispatch: () => AppDispatch = useDispatch;
export const Selector: TypedUseSelectorHook<RootState> = useSelector;
