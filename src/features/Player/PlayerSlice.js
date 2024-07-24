import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPlaylist: '',
  currentAlbum: '',
  currentTrack: '0T4AitQuq8IJhWBWuZwkFA',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
  },
});

export const { playTrack } = playerSlice.actions;

export default playerSlice.reducer;
