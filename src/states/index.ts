import { combineReducers as combineStates } from '@reduxjs/toolkit';
import { productState } from './productState';

export const rootState = combineStates({ productState });
