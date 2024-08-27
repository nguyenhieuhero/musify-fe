import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSimilarTracks } from '../services/apiService';
import TrackCard from '../components/TrackCard';
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

function SimilarTracks() {
  const { id } = useParams();
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await getSimilarTracks(id);
        setTracks(response.data);
      } catch (error) {
        console.error('Failed to fetch playlist tracks', error);
      }
    };
    fetchTracks();
  }, [id]);

  console.log(tracks);
  return (
    <PlaylistContainer>
      {tracks && <h1>More like {tracks.name}</h1>}
      <TrackList>
        {tracks &&
          tracks.similarTracks.map((track) => (
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

export default SimilarTracks;
