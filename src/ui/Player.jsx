import styled from 'styled-components';
import { useSelector } from 'react-redux';
const StyledPlayer = styled.div`
  position: relative;
  display: flex;
  height: 9vh;
  width: 100vw;
  background-color: #282828;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledSpotifyPlayerContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 61vw;
`;

function Player() {
  const { currentTrack } = useSelector((state) => state.player);
  return (
    <StyledPlayer>
      <StyledSpotifyPlayerContainer>
        <iframe
          id="my-iframe"
          src={`https://open.spotify.com/embed/track/${currentTrack}?utm_source=generator&theme=0`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="encrypted-media"
          scrolling="no"
        ></iframe>
      </StyledSpotifyPlayerContainer>
    </StyledPlayer>
  );
}

export default Player;
