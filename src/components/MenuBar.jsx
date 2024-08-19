import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from '../ui/SideBar';
import { getUserPlaylists } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import PlaylistModal from './PlaylistModal';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylist } from '../features/Player/PlaylistSlice';

function MenuBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { playlists } = useSelector((state) => state.playlist);
  const fetchPlaylists = useCallback(async () => {
    try {
      const _playlists = await getUserPlaylists();
      dispatch(setPlaylist(_playlists.playlists));
    } catch (error) {
      console.error('Failed to fetch playlists', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return (
    <SideBar>
      <SideBar.Section>
        <SideBar.Item
          icon={<FontAwesomeIcon icon={faHome} />}
          to="/"
          isActive={location.pathname === '/'}
        >
          Home
        </SideBar.Item>
        <SideBar.Item
          icon={<FontAwesomeIcon icon={faSearch} />}
          to="/search"
          isActive={location.pathname === '/search'}
        >
          Search
        </SideBar.Item>
      </SideBar.Section>
      <SideBar.Section>
        Create Playlist
        <PlaylistModal trigger="+" onPlaylistCreated={fetchPlaylists} />
        {playlists &&
          playlists.map((playlist) => (
            <SideBar.SubItem
              key={playlist.id}
              image={
                playlist.playlist_image || 'https://via.placeholder.com/40'
              }
              to={`/playlist/${playlist.id}`}
              isActive={location.pathname === `/playlist/${playlist.id}`}
            >
              {playlist.playlist_name}
            </SideBar.SubItem>
          ))}
      </SideBar.Section>
    </SideBar>
  );
}

export default MenuBar;
