import { configureStore } from '@reduxjs/toolkit';
import { rootState } from '@examples/states';

export const store = configureStore({
  reducer: rootState,
});
