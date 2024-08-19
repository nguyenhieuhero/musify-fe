import TrackCard from '../components/TrackCard';
import Header from '../ui/Header';
import { Link, useParams } from 'react-router-dom';
import { getAlbumInfo } from '../services/apiService';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AlbumContainer = styled.div`
  padding: 20px;
  background-color: #121212;
  color: gray;
`;

const TrackList = styled.div`
  margin-top: 30px;
  min-height: 100vh;
`;

function Album() {
  const { id } = useParams();
  const [albumInfo, setAlbumInfo] = useState(null);

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      try {
        const response = await getAlbumInfo(id);
        setAlbumInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch album info', error);
      }
    };

    fetchAlbumInfo();
  }, [id]);

  if (!albumInfo) return null;

  return (
    <AlbumContainer>
      <Header
        title="Album"
        name={albumInfo.album_name}
        description={albumInfo.artists.map((artist, index) => (
          <span key={artist.id}>
            <Link to={`/artist/${artist.id}`}>{artist.artist_name}</Link>
            {index < albumInfo.artists.length - 1 && ', '}
          </span>
        ))}
        image={albumInfo.album_images[0].url}
      />
      <TrackList>
        {albumInfo.playlist_tracks.map((track) => (
          <TrackCard
            key={track.id}
            track_name={track.track_name}
            artists={track.artists}
            albums={track.albums}
            id={track.id}
          />
        ))}
      </TrackList>
    </AlbumContainer>
  );
}

export default Album;
