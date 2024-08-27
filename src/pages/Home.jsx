import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMyArtists, getPopularArtists } from '../services/apiService';
import PlaylistCard from '../components/PlaylistCard';
import { Scrollable } from '../ui/ScrollBar';

// Main layout container
const HomePageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #121212;
  min-height: 100vh;
  color: white;
`;

const HeroSection = styled.div`
  background-size: cover;
  background-position: center;
  text-align: center;
  color: white;
  margin: 20px 0;
  border-radius: 10px;
  overflow: hidden;
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
`;

// Content sections
const SectionTitle = styled.h2`
  font-size: 24px;
  margin: 20px 0;
  padding-left: 20px;
`;

const SectionContainer = styled(Scrollable)`
  display: flex;
  width: 97%;
  align-self: center;
  padding: 10px;
  overflow-x: scroll; /* Horizontal scrolling */
  scroll-behavior: smooth;
  gap: 20px;
`;

function Home() {
  const [myArtists, setMyArtists] = useState(null);
  const [popularArtists, setPopularArtists] = useState(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const _myArtists = await getMyArtists();
        const _popularArtists = await getPopularArtists();
        setMyArtists(_myArtists.data.artists);
        setPopularArtists(_popularArtists.data.artists);
      } catch (error) {
        console.error('Failed to fetch artist info', error);
      }
    };

    fetchHome();
  }, []);

  return (
    <HomePageContainer>
      <HeroSection>
        <HeroTitle>Discover Your Taste</HeroTitle>
      </HeroSection>

      {myArtists && (
        <>
          <SectionTitle>Your Artists</SectionTitle>
          <SectionContainer>
            {myArtists.map((artist) => (
              <PlaylistCard
                key={artist.id}
                cardName={artist.artist_name}
                image={artist.images[0].url}
                to={`artist/${artist.id}`}
              />
            ))}
          </SectionContainer>
        </>
      )}

      {popularArtists && <SectionTitle>Most Popular Artists</SectionTitle>}
      {popularArtists && (
        <SectionContainer>
          {popularArtists.map((artist) => (
            <PlaylistCard
              key={artist.id}
              cardName={artist.artist_name}
              image={artist.images[0].url}
              to={`artist/${artist.id}`}
            />
          ))}
        </SectionContainer>
      )}
    </HomePageContainer>
  );
}

export default Home;
