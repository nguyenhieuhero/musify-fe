import { configureStore } from '@reduxjs/toolkit';
import PlayerSlice from '../features/Player/PlayerSlice';
export const store = configureStore({
  reducer: {
    player: PlayerSlice,
  },
});
