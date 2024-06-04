import { combineReducers as combineStates } from '@reduxjs/toolkit';
import { normalizedEntitiesState } from 'react-redux-use-model';

export const rootState = combineStates({
  normalizedEntitiesState,
});
