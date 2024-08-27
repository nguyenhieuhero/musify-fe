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
  box-shadow: 1px -3px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 1px -3px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px -3px 5px 0px rgba(0, 0, 0, 0.75);
`;

const StyledSpotifyPlayerContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 61vw;
`;

function Player() {
  const { trackInfo } = useSelector((state) => state.player);
  if (!trackInfo) {
    return (
      <StyledPlayer>
        <h2>Pick a song to play!</h2>
      </StyledPlayer>
    );
  }
  return (
    <StyledPlayer>
      <StyledSpotifyPlayerContainer>
        <iframe
          id="my-iframe"
          src={`https://open.spotify.com/embed/track/${trackInfo.id}?utm_source=generator&theme=0`}
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
