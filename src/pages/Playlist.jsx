import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import TrackCard from '../components/TrackCard';
import Header from '../ui/Header';
import { useParams } from 'react-router-dom';
import { getPlaylistTracksById, getRcmTracks } from '../services/apiService';
import { useEffect, useState } from 'react';
import PlaylistModal from '../components/PlaylistModal';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  padding: 20px;
  background-color: #121212;
  color: gray;
`;

const TrackList = styled.div`
  margin-top: 30px;
  min-height: 50vh;
`;

const SettingsIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 20px;
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: #1db954; /* Adjust color on hover */
  }
`;

function Playlist() {
  const { id } = useParams();
  const [tracks, setTracks] = useState(null);
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [rcmTracks, setRcmTracks] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await getPlaylistTracksById(id);
        setTracks(response.data.playlist_tracks);
        if (response.data.playlist_tracks) {
          const rcm = await getRcmTracks(id);
          setRcmTracks(rcm.data.tracks);
        }
        setPlaylistInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch playlist tracks', error);
      }
    };
    fetchTracks();
  }, [id]);
  console.log(rcmTracks);
  return (
    <PlaylistContainer>
      {playlistInfo && (
        <>
          <Header
            title="Playlist"
            name={playlistInfo.playlist_name}
            description={playlistInfo.playlist_description}
            image={playlistInfo.playlist_image}
            settingIcon={
              playlistInfo.isOwner && (
                <PlaylistModal
                  trigger={<SettingsIcon icon={faGear} />}
                  name={playlistInfo.playlist_name}
                  desc={playlistInfo.playlist_description}
                  img={playlistInfo.playlist_image}
                  id={playlistInfo.id}
                  title="Edit Playlist"
                  canDelete={true}
                />
              )
            }
          />
        </>
      )}
      <TrackList>
        {tracks &&
          tracks.map((track) => (
            <TrackCard
              key={track.id}
              track_name={track.track_name}
              artists={track.artists}
              albums={track.albums}
              id={track.id}
            />
          ))}
      </TrackList>
      {rcmTracks ? (
        <h1>Maybe you will like</h1>
      ) : (
        <h1>Add some tracks to your playlist</h1>
      )}
      <TrackList>
        {rcmTracks &&
          rcmTracks.map((track) => (
            <TrackCard
              key={track.id}
              track_name={track.track_name}
              artists={track.artists}
              albums={track.albums}
              id={track.id}
            />
          ))}
      </TrackList>
    </PlaylistContainer>
  );
}

export default Playlist;
