import { configureStore } from '@reduxjs/toolkit';
import placeholderReducer from './placeholderSlice.js';

const store = configureStore({
  reducer: {
    placeholder: placeholderReducer,
  },
});

export default store;
