import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { playTrack } from '../features/Player/PlayerSlice';
import Dropdown from './DropdownPopUp';

const TrackCardContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ $isPlaying }) => ($isPlaying ? 'yellow' : 'white')};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 95%;
  margin: 10px;
  position: relative;
  &:hover {
    background-color: red;
  }
`;

const AlbumCover = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const TrackInfo = styled.div`
  padding: 10px;
  flex-grow: 1;
`;

const TrackName = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #333;
`;

const ArtistName = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0 0;
`;

const AlbumName = styled.p`
  font-size: 12px;
  color: #777;
  margin: 5px 0 0;
`;

const TrackCard = ({ track }) => {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const { artists, albums, track_name, track_uri } = track;
  const { album_name, album_images } = albums[0];
  const { url } = album_images[0];
  const splits = track_uri.split(':');
  const track_id = splits[splits.length - 1];
  const handleClick = () => {
    dispatch(playTrack(track_id));
  };

  return (
    <TrackCardContainer
      onClick={handleClick}
      $isPlaying={currentTrack == track_id}
    >
      <AlbumCover src={url} alt={album_name} />
      <TrackInfo>
        <TrackName>{track_name}</TrackName>
        <ArtistName>{artists[0].artist_name}</ArtistName>
        <AlbumName>{album_name}</AlbumName>
      </TrackInfo>
      <Dropdown>
        <Dropdown.Trigger>
          <button>Options</button>
        </Dropdown.Trigger>
        <Dropdown.Menu isOpen={true}>
          <Dropdown.Item>Option 1</Dropdown.Item>
          <Dropdown.Item>Option 2</Dropdown.Item>
          <Dropdown.Item>Option 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </TrackCardContainer>
  );
};

export default TrackCard;
