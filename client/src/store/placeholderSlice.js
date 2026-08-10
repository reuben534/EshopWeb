import { createSlice } from '@reduxjs/toolkit';

const placeholderSlice = createSlice({
  name: 'placeholder',
  initialState: { ready: true },
  reducers: {},
});

export default placeholderSlice.reducer;
