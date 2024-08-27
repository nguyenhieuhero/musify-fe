import styled from 'styled-components';
import { Scrollable } from '../ui/ScrollBar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTrackInfo } from '../services/apiService';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import OwnedPlaylists from './OwnedPlaylists';

// Sidebar styling
const StyledSideBar = styled(Scrollable)`
  height: 91vh;
  width: 20vw;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

// Track card styling
const StyledTrack = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #1a1a1a;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333333;
  }
`;

const TrackTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Track name styling
const TrackName = styled.h3`
  font-size: 16px;
  color: white;
  margin: 0 0 5px 0;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Additional track info styling
const TrackInfo = styled.div`
  font-size: 14px;
  color: #b3b3b3;
  margin-bottom: 3px;
`;

// Progress bar container and styling
const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #333;
  border-radius: 5px;
  height: 6px;
  margin-top: 5px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #1db954;
  width: ${({ $progress }) => $progress}%;
  border-radius: 5px;
`;

// Track attribute styling
const TrackAttributes = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #b3b3b3;
  margin-top: 5px;
`;

// Artist card container styling
const CardContainer = styled.div`
  width: 100%px;
  padding: 10px;
  background-color: #1a1a1a;
  border-radius: 10px;
  color: white;
  text-align: center;
  font-family: Arial, sans-serif;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333333;
  }
  margin-bottom: 10px;
`;

// Artist image styling
const ArtistImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

// Artist name styling
const ArtistName = styled.h3`
  margin: 10px 0 5px 0;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

function TrackInfoBar() {
  const navigate = useNavigate();
  const { trackInfo } = useSelector((state) => state.player);
  const [track, setTrack] = useState(null);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const _trackInfo = await getTrackInfo(trackInfo.id);
        setTrack(_trackInfo.data.trackInfo);
        setArtist(_trackInfo.data.artistInfo);
      } catch (error) {
        console.error('Failed to fetch trackInfo', error);
      }
    };
    if (trackInfo && trackInfo.id) {
      fetchPlaylists();
    }
  }, [trackInfo]);

  return (
    <StyledSideBar>
      {artist && (
        <CardContainer onClick={() => navigate(`/artist/${artist.id}`)}>
          <ArtistImage src={artist.images[0].url} alt={artist.artist_name} />
          <ArtistName>{artist.artist_name}</ArtistName>
        </CardContainer>
      )}

      {track && (
        <StyledTrack
          onDoubleClick={() => {
            navigator.clipboard.writeText(track.id);
            toast.success('Track id copied to clipboard');
          }}
        >
          <TrackTitleSection>
            <TrackName>{track.track_name}</TrackName>
            <Link to={`/track/similar/${track.id}`}>More like this</Link>
          </TrackTitleSection>
          <TrackInfo>Popularity: {track.popularity}</TrackInfo>
          <TrackInfo>Energy: {track.energy}</TrackInfo>
          <TrackInfo>Tempo: {track.tempo.toFixed(1)} BPM</TrackInfo>
          <ProgressBarContainer>
            <ProgressBar $progress={track.danceability * 100} />
          </ProgressBarContainer>
          <TrackAttributes>
            <span>Danceability: {track.danceability}</span>
          </TrackAttributes>
        </StyledTrack>
      )}
      {track && <OwnedPlaylists trackId={track.id} />}
    </StyledSideBar>
  );
}

export default TrackInfoBar;
