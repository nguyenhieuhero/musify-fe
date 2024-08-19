import styled from 'styled-components';
const StyledBottomBar = styled.div`
  height: 200px;
  width: 100%;
  background-color: transparent;
  align-self: flex-end;
`;

function BottomBar() {
  return (
    <StyledBottomBar>
      <h1>Merisu</h1>
    </StyledBottomBar>
  );
}

export default BottomBar;
