import styled from 'styled-components';
import { useState } from 'react';

const StyledSideBar = styled.div`
  height: 100vh;
  width: 20vw;
  background-color: black;
`;

function SideBar() {
  const [isExpand, setIsExpand] = useState(true);
  return <StyledSideBar />;
}

export default SideBar;
