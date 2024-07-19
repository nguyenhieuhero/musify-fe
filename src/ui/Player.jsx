import styled from 'styled-components';

const StyledPlayer = styled.div`
  display: flex;
  height: 9vh;
  width: 100vw;
  background-color: #282828;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledSpotifyPlayerContainer = styled.div`
  height: 8vh;
  width: 61vw;
`;

function Player() {
  // var iFrameEl = document.getElementById('my-iframe');
  // var backgroundColor = iFrameEl.contentWindow.getComputedStyle(
  //   iFrameEl.contentWindow.document.body
  // ).backgroundColor;
  // console.log(backgroundColor);

  return (
    <StyledPlayer>
      <StyledSpotifyPlayerContainer>
        <iframe
          id="my-iframe"
          src="https://open.spotify.com/embed/track/0T4AitQuq8IJhWBWuZwkFA?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
          scrolling="no"
        ></iframe>
      </StyledSpotifyPlayerContainer>
    </StyledPlayer>
  );
}

export default Player;
