import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArtistInfo } from '../services/apiService';
import Header from '../ui/Header';
import PlaylistCard from '../components/PlaylistCard';
import styled from 'styled-components';

const ArtistPageContainer = styled.div`
  padding: 20px;
  background-color: #121212;
  color: white;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  font-weight: bold;
  color: #ffffff;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
`;

function Artist() {
  const { id } = useParams();
  const [artistInfo, setArtistInfo] = useState(null);

  useEffect(() => {
    const fetchArtistInfo = async () => {
      try {
        const response = await getArtistInfo(id);
        setArtistInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch artist info', error);
      }
    };

    fetchArtistInfo();
  }, [id]);

  if (!artistInfo) return null;

  return (
    <ArtistPageContainer>
      <Header
        title="Artist"
        name={artistInfo.artist_name}
        image={artistInfo.images[0]?.url}
        description={artistInfo.genres.map((genre, index) => (
          <span key={genre}>
            <Link to={`/genre/${genre}`} style={{ color: '#1db954' }}>
              {genre}
            </Link>
            {index < artistInfo.genres.length - 1 && ', '}
          </span>
        ))}
      />

      <Section>
        <SectionTitle>Albums</SectionTitle>
        <CardGrid>
          {artistInfo.albums.map((album) => (
            <PlaylistCard
              key={album.id}
              cardName={album.album_name}
              des={album.release_date}
              image={album.images[0]?.url}
              to={`/album/${album.id}`}
            />
          ))}
        </CardGrid>
      </Section>

      {artistInfo.featuring.length > 0 && (
        <Section>
          <SectionTitle>Featuring</SectionTitle>
          <CardGrid>
            {artistInfo.featuring.map((album) => (
              <PlaylistCard
                key={album.id}
                cardName={album.album_name}
                des={album.release_date}
                image={album.images[0]?.url}
                to={`/album/${album.id}`}
              />
            ))}
          </CardGrid>
        </Section>
      )}
    </ArtistPageContainer>
  );
}

export default Artist;
