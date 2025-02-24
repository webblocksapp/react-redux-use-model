import {
  configureStore,
  combineReducers as combineStates,
} from '@reduxjs/toolkit';
import { normalizedEntitiesState } from 'react-redux-use-model';

export const rootState = combineStates({
  normalizedEntitiesState,
});

export const store = configureStore({
  reducer: rootState,
});

export type RootState = ReturnType<typeof rootState>;
