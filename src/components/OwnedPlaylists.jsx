import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import {
  addTrackToPlaylist,
  checkTrackExistInMyPlaylist,
  deleteTrackFromPlaylist,
} from '../services/apiService';
import toast from 'react-hot-toast';

const PlaylistSidebar = styled.div`
  height: 91vh;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
`;

// Playlist item styling
const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #1a1a1a;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

// Playlist name styling
const PlaylistName = styled.h3`
  font-size: 16px;
  color: white;
  margin: 0;
  flex: 1;
`;

// Checkbox styling
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
`;

function OwnedPlaylists({ trackId }) {
  const [checker, setChecker] = useState([]);

  const checkExist = useCallback(async () => {
    try {
      const response = await checkTrackExistInMyPlaylist(trackId);
      setChecker(response.data);
    } catch (error) {
      console.error('Failed to fetch playlist check', error);
    }
  }, [trackId]);

  useEffect(() => {
    checkExist();
  }, [trackId, checkExist]);

  const handleCheckboxChange = async (playlistId, isInPlaylist) => {
    try {
      if (isInPlaylist) {
        const res = await deleteTrackFromPlaylist(playlistId, trackId);
        toast.success(res.data.message);
      } else {
        const res = await addTrackToPlaylist(playlistId, trackId);
        toast.success(res.data.message);
      }
      // Re-fetch the data to update the list
      await checkExist();
    } catch (error) {
      console.error('Failed to update playlist', error);
      toast.error('Failed to update playlist');
    }
  };

  if (!checker) {
    return null;
  }

  return (
    <PlaylistSidebar>
      {checker.length === 0 ? (
        <p>No owned playlists found.</p>
      ) : (
        checker.map((playlist) => (
          <PlaylistItem key={playlist.id}>
            <Checkbox
              checked={playlist.isInPlaylist}
              onChange={() =>
                handleCheckboxChange(playlist.id, playlist.isInPlaylist)
              }
            />
            <PlaylistName>{playlist.playlist_name}</PlaylistName>
          </PlaylistItem>
        ))
      )}
    </PlaylistSidebar>
  );
}

export default OwnedPlaylists;
