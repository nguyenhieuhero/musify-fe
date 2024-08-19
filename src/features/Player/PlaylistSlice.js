import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlists: [],
};

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      state.playlists = action.payload;
    },
  },
});

export const { setPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
