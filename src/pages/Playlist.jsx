import styled from 'styled-components';
import TrackCard from '../ui/TrackCard';
import Header from '../ui/Header';
import { tracks } from '../data/playlist_tracks';

const StyledPlaylist = styled.div`
  background-color: gray;
  padding-top: 100px;
`;

function Playlist() {
  return (
    <StyledPlaylist>
      <Header title={tracks.playlist_name} />
      {tracks.playlist_tracks.map((track) => (
        <TrackCard track={track} key={track.track_uri} />
      ))}
    </StyledPlaylist>
  );
}

export default Playlist;
