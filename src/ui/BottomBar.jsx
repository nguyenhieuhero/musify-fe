import styled from 'styled-components';
import { useState } from 'react';
const StyledBottomBar = styled.div`
  height: 200px;
  width: 100%;
  background-color: olive;
  align-self: flex-end;
`;

function BottomBar() {
  const [c, setC] = useState(0);
  return (
    <StyledBottomBar onClick={() => setC(c + 1)}>
      <h1>Bottom Bar {c}</h1>
    </StyledBottomBar>
  );
}

export default BottomBar;
