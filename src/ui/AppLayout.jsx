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
          <SideBar.Section>
            <SideBar.Item icon={'Home'} to="/">
              Home
            </SideBar.Item>
            <SideBar.Item icon={'Search'} to="/search">
              Search
            </SideBar.Item>
          </SideBar.Section>
          <SideBar.Section>
            <SideBar.Item icon={'----------'} to="/playlist">
              Your Library
            </SideBar.Item>
            <SideBar.Title>Playlists</SideBar.Title>
            <SideBar.SubItem image="https://via.placeholder.com/40">
              {"When I'm Alone"}
            </SideBar.SubItem>
            <SideBar.SubItem image="https://via.placeholder.com/40">
              Nostalgic
            </SideBar.SubItem>
            <SideBar.SubItem image="https://via.placeholder.com/40">
              Relax
            </SideBar.SubItem>
            <SideBar.SubItem image="https://via.placeholder.com/40">
              Instrumentals
            </SideBar.SubItem>
            <SideBar.SubItem image="https://via.placeholder.com/40">
              Instrumentals
            </SideBar.SubItem>
            <SideBar.SubItem image="https://via.placeholder.com/40">
              Instrumentals
            </SideBar.SubItem>
            <SideBar.SubItem image="https://via.placeholder.com/40">
              Instrumentals
            </SideBar.SubItem>
            <SideBar.SubItem image="https://via.placeholder.com/40">
              Instrumentals
            </SideBar.SubItem>
          </SideBar.Section>
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
