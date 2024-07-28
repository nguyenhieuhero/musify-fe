import styled from 'styled-components';
import { useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import { Scrollable } from './ScrollBar';

const SideBarContext = createContext();

const StyledSideBar = styled(Scrollable)`
  height: 91vh;
  width: 20vw;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const StyledSection = styled.div`
  margin-bottom: 20px;
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const StyledTitle = styled.div`
  font-weight: bold;
  margin: 20px 0 10px;
`;

const StyledSubItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 10px;
`;

const SideBar = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <SideBarContext.Provider value={{ count, setCount }}>
      <StyledSideBar onClick={() => setCount((prev) => prev + 1)}>
        {children}
      </StyledSideBar>
    </SideBarContext.Provider>
  );
};

const Section = ({ children }) => {
  return <StyledSection>{children}</StyledSection>;
};

const Item = ({ icon, to, children }) => {
  return (
    <StyledItem>
      {icon}
      <StyledLink to={to}>{children}</StyledLink>
    </StyledItem>
  );
};

const Title = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

const SubItem = ({ image, children }) => {
  return (
    <StyledSubItem>
      {image && (
        <img
          src={image}
          alt=""
          style={{ width: '40px', height: '40px', marginRight: '10px' }}
        />
      )}
      <span>{children}</span>
    </StyledSubItem>
  );
};

SideBar.Section = Section;
SideBar.Item = Item;
SideBar.Title = Title;
SideBar.SubItem = SubItem;

export default SideBar;
