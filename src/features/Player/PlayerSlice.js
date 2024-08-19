import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trackInfo: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack: (state, action) => {
      state.trackInfo = action.payload;
    },
  },
});

export const { playTrack } = playerSlice.actions;

export default playerSlice.reducer;
