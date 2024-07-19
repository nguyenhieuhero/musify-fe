import styled from 'styled-components';
import TrackCard from '../ui/TrackCard';
import EditableImage from '../ui/EditableImage';

const StyledPlaylist = styled.div`
  height: 200vh;
  background-color: gray;
  overflow-y: scroll;
  padding-top: 70px;
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

function Playlist() {
  return (
    <StyledPlaylist>
      <h1>Playlist</h1>
      <EditableImage />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
    </StyledPlaylist>
  );
}

export default Playlist;
