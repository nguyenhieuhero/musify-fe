import styled from 'styled-components';
import useBackForward from '../hooks/useBackForward';
import Button from '../ui/Button';
import Dropdown from '../ui/DropdownPopUp';
import { useAuthContext } from '../contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import SearchBar from '../ui/SearchBar';

// Main container for the top bar
const StyledTopBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: ${({ opacity }) => `rgba(0, 0, 0, ${opacity})`};
  padding: 0 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  z-index: 1000;
`;

// Container for navigation buttons
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Container for logo and user avatar
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

// Avatar styling
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

// Search bar container (conditional rendering)
const SearchBarContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
`;

function TopBar({ contentRef }) {
  const [opacity, setOpacity] = useState(0.3);
  const { user } = useAuthContext();
  const { goBack, goForward, canGoBack, canGoForward } = useBackForward();
  const logOut = useLogout();
  const location = useLocation();

  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      const scrollTop = contentRef.current.scrollTop;
      const maxScroll = 300;
      const newOpacity = Math.min(1, scrollTop / maxScroll);
      setOpacity(newOpacity < 0.3 ? 0.3 : newOpacity);
    }
  }, [contentRef]);

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      return () => {
        content.removeEventListener('scroll', handleScroll);
      };
    }
  }, [contentRef, handleScroll]);

  return (
    user && (
      <StyledTopBar opacity={opacity}>
        <ButtonGroup>
          <Button onClick={goBack} disabled={!canGoBack} aria-label="Go Back">
            {'<'}
          </Button>
          <Button
            onClick={goForward}
            disabled={!canGoForward}
            aria-label="Go Forward"
          >
            {'>'}
          </Button>
        </ButtonGroup>
        {location.pathname === '/search' && (
          <SearchBarContainer>
            <SearchBar />
          </SearchBarContainer>
        )}
        <LogoContainer>
          <Dropdown>
            <Dropdown.Trigger>
              <Avatar src={user.imageUrl} alt={user.userName} />
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Account</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item onClick={() => logOut()}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </LogoContainer>
      </StyledTopBar>
    )
  );
}

export default TopBar;
