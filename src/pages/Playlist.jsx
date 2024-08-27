import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRefresh } from '@fortawesome/free-solid-svg-icons';
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

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: #1db954; /* Adjust color on hover */
  }
`;

const H1 = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Playlist() {
  const { id } = useParams();
  const [tracks, setTracks] = useState(null);
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [rcmTracks, setRcmTracks] = useState(null);
  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  };

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await getPlaylistTracksById(id);
        setTracks(response.data.playlist_tracks);
        setPlaylistInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch playlist tracks', error);
      }
    };
    fetchTracks();
  }, [id]);

  useEffect(() => {
    const fetchRcmTracks = async () => {
      try {
        const response = await getRcmTracks(id);
        setRcmTracks(response.data.tracks);
      } catch (error) {
        console.error('Failed to fetch playlist tracks', error);
      }
    };
    fetchRcmTracks();
  }, [id, seed]);

  return (
    <PlaylistContainer>
      {playlistInfo ? (
        <>
          <Header
            title="Playlist"
            name={playlistInfo.playlist_name}
            description={playlistInfo.playlist_description}
            image={playlistInfo.playlist_image}
            settingIcon={
              playlistInfo.isOwner && (
                <PlaylistModal
                  trigger={<Icon icon={faGear} size="2x" />}
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
      ) : (
        <h1>Add some tracks to your playlist</h1>
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
      {rcmTracks && (
        <H1>
          Maybe you will like{' '}
          <Icon icon={faRefresh} size="xs" onClick={reset} />
        </H1>
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
