import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { playTrack } from '../features/Player/PlayerSlice';
import { Link, useNavigate } from 'react-router-dom';

const TrackCardContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ $isPlaying }) => ($isPlaying ? '#1db954' : '#282828')};
  padding: 12px;
  border-radius: 8px;
  margin: 8px 0;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #3e3e3e;
  }
`;

const AlbumCover = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 16px;
  object-fit: cover;
`;

const TrackDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TrackName = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtistName = styled.span`
  font-size: 14px;
  color: #b3b3b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AlbumName = styled.span`
  font-size: 14px;
  color: #b3b3b3;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const TrackCard = ({ track_name, artists, albums, id, option }) => {
  const dispatch = useDispatch();
  const { trackInfo } = useSelector((state) => state.player);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(playTrack({ track_name, artists, albums, id, option }));
  };

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <TrackCardContainer
      onDoubleClick={handleClick}
      $isPlaying={trackInfo?.id === id}
    >
      {albums && (
        <AlbumCover
          src={albums[0].album_images[0].url}
          alt={albums[0].album_name}
        />
      )}
      <TrackDetails>
        <TrackInfo>
          <TrackName>{track_name}</TrackName>
          <ArtistName>
            {artists &&
              artists.map((artist, index) => (
                <span key={artist.id}>
                  <Link to={`/artist/${artist.id}`}>{artist.artist_name}</Link>
                  {index < artists.length - 1 && ', '}
                </span>
              ))}
          </ArtistName>
        </TrackInfo>
        {albums && (
          <AlbumName onClick={() => handleAlbumClick(albums[0].id)}>
            {albums[0].album_name}
          </AlbumName>
        )}
      </TrackDetails>
      {option && option}
    </TrackCardContainer>
  );
};

export default TrackCard;
