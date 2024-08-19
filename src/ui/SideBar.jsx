import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Scrollable } from './ScrollBar';

const StyledSideBar = styled(Scrollable)`
  height: 100vh;
  width: 20vw; /* Adjust width for better layout */
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.3); /* Add shadow for separation */
`;

const StyledSection = styled.div`
  margin-bottom: 20px;
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ $isActive }) => ($isActive ? '#333' : 'transparent')};
  &:hover {
    background-color: #333;
  }
  transition: background-color 0.2s;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
`;

const StyledSubItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ $isActive }) => ($isActive ? '#333' : 'transparent')};
  &:hover {
    background-color: #333;
  }
  transition: background-color 0.2s;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 10px;
`;

const SideBar = ({ children }) => {
  return <StyledSideBar>{children}</StyledSideBar>;
};

const Section = ({ children }) => {
  return <StyledSection>{children}</StyledSection>;
};

const Item = ({ icon, to, children, isActive }) => {
  return (
    <StyledItem $isActive={isActive}>
      {icon}
      <StyledLink to={to}>{children}</StyledLink>
    </StyledItem>
  );
};

const Title = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

const SubItem = ({ to, image, children, isActive }) => {
  return (
    <StyledSubItem $isActive={isActive}>
      {image && (
        <img
          src={image}
          alt=""
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '4px',
            marginRight: '10px',
          }}
        />
      )}
      <StyledLink to={to}>{children}</StyledLink>
    </StyledSubItem>
  );
};

SideBar.Section = Section;
SideBar.Item = Item;
SideBar.Title = Title;
SideBar.SubItem = SubItem;

export default SideBar;
