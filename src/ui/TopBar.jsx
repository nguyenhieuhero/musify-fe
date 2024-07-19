import styled from 'styled-components';

const StyledTopBar = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  z-index: 1000;
  height: 64px;
  width: 100%;
  background-color: green;
  opacity: 0.5;
`;
function TopBar() {
  return <StyledTopBar />;
}

export default TopBar;
