import styled from 'styled-components';
import useBackForward from '../hooks/useBackForward';
import Button from './Button';
import { useCallback, useEffect, useState } from 'react';
import Dropdown from './DropdownMenu';

const StyledTopBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 64px;
  width: 100%;
  background-color: transparent; /* Make main background transparent */
  padding: 10px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: green;
    opacity: ${({ opacity }) => opacity};
    z-index: -1; /* Ensure background stays behind other elements */
  }
`;
function TopBar({ contentRef }) {
  const [opacity, setOpacity] = useState(0.8);
  const { goBack, goForward, canGoBack, canGoForward } = useBackForward();

  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      const scrollTop = contentRef.current.scrollTop;
      const maxScroll = 300; // Adjust this value as needed
      const newOpacity = scrollTop / maxScroll;
      setOpacity(newOpacity < 0.5 ? 0.5 : newOpacity);
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
    <StyledTopBar opacity={opacity}>
      <Button onClick={goBack} disabled={!canGoBack}>
        Back
      </Button>
      <Button onClick={goForward} disabled={!canGoForward}>
        Forward
      </Button>
      <Dropdown>
        <Dropdown.Trigger>
          <button>Open Dropdown</button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => console.log('item1')}>
            Item 1
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log('item2')}>
            Item 2
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log('item3')}>
            Item 3
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </StyledTopBar>
  );
}

export default TopBar;
