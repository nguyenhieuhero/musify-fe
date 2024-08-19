import { configureStore } from '@reduxjs/toolkit';
import PlayerSlice from '../features/Player/PlayerSlice';
import PlaylistSlice from '../features/Player/PlaylistSlice';
export const store = configureStore({
  reducer: {
    player: PlayerSlice,
    playlist: PlaylistSlice,
  },
});
