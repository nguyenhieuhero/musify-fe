import styled from 'styled-components';
// import { single_track } from '../data/track';

const StyledTrackCard = styled.div`
  height: 54px;
  width: 900px;
  background-color: red;
  margin: 10px;
`;

function TrackCard() {
  return <StyledTrackCard />;
}

export default TrackCard;
