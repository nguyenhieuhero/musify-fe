import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ResizableDiv from './ResizableDiv';
import Player from './Player';
import SideBar from './SideBar';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { Scrollable } from './ScrollBar';
import { useRef } from 'react';

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
  flex-grow: 1;
  background-color: blue;
  /* overflow-y: scroll; */
`;

const RowLayout = styled.div`
  display: flex;
  flex-direction: row;
  background-color: gray;
  height: 91vh;
  width: 100vw;
`;

const Content = styled(Scrollable)`
  flex-grow: 1;
`;

function AppLayout() {
  const contentRef = useRef(null);
  return (
    <StyledAppLayout>
      <RowLayout>
        <SideBar>
          <SideBar.Navigate />
        </SideBar>
        <Container>
          <TopBar contentRef={contentRef} />
          <Content ref={contentRef}>
            <Outlet />
            <BottomBar />
          </Content>
        </Container>
        <ResizableDiv />
      </RowLayout>
      <Player />
    </StyledAppLayout>
  );
}

export default AppLayout;
