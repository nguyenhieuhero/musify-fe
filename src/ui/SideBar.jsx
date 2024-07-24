import styled from 'styled-components';
import { useState, createContext } from 'react';
import { Link } from 'react-router-dom';

const StyledSideBar = styled.div`
  height: 91vh;
  width: 20vw;
  background-color: black;
`;

const SideBarContext = createContext();

function SideBar({ children }) {
  // const [isExpand, setIsExpand] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <SideBarContext.Provider>
      <StyledSideBar onClick={() => setCount((count) => count + 1)}>
        <h1>{count}</h1>
        {children}
      </StyledSideBar>
    </SideBarContext.Provider>
  );
}

function HomeNavigate() {
  return (
    <ul>
      <Link to="/playlist">Playlist</Link>
      <Link to="/">home</Link>
    </ul>
  );
}
SideBar.Navigate = HomeNavigate;

export default SideBar;
