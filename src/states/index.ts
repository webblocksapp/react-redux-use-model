import { combineReducers as combineStates } from '@reduxjs/toolkit';
import { normalizedEntitiesState } from './normalizedEntitiesState';

export const rootState = combineStates({
  normalizedEntitiesState,
});
