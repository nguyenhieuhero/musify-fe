import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Player from '../components/Player';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import { Scrollable } from './ScrollBar';
import { useRef } from 'react';
import MenuBar from '../components/MenuBar';
import TrackInfoBar from '../components/TrackInfoBar';

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-grey-100);
`;
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* overflow-y: scroll; */
`;

const RowLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 91vh;
  width: 100vw;
`;

const Content = styled(Scrollable)`
  display: flex;
  flex-direction: column;
  width: 60vw;
  min-height: 80vh;
  background-color: #121212;
`;

function AppLayout() {
  const contentRef = useRef(null);
  return (
    <StyledAppLayout>
      <RowLayout>
        <MenuBar />
        <Container>
          <TopBar contentRef={contentRef} />
          <Content ref={contentRef}>
            <Outlet />
            <BottomBar />
          </Content>
        </Container>
        <TrackInfoBar />
      </RowLayout>
      <Player />
    </StyledAppLayout>
  );
}

export default AppLayout;
