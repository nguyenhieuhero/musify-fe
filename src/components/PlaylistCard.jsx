import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #181818;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  color: white;
  font-family: 'Arial', sans-serif;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const AlbumImage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // This makes the div a square
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const TrackInfo = styled.div`
  text-align: center;
`;

const TrackName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const TrackArtists = styled.div`
  font-size: 14px;
  color: #b3b3b3;
`;

const PlaylistCard = ({ image, cardName, des, to }) => {
  return (
    <Link to={to}>
      <Card>
        <AlbumImage $image={image}></AlbumImage>
        <TrackInfo>
          <TrackName>{cardName}</TrackName>
          <TrackArtists>{des}</TrackArtists>
        </TrackInfo>
      </Card>
    </Link>
  );
};

export default PlaylistCard;
