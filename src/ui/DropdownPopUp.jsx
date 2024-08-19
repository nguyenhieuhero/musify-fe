import { useState, createContext, useContext } from 'react';
import styled from 'styled-components';

const DropdownContext = createContext();

const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledDropdownPopUp = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(153, 146, 146, 0.1);
  z-index: 1000;
`;

const StyledDropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <StyledDropdown>{children}</StyledDropdown>
    </DropdownContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { setIsOpen } = useContext(DropdownContext);
  return <div onClick={() => setIsOpen((prev) => !prev)}>{children}</div>;
};

const Menu = ({ children }) => {
  const { isOpen } = useContext(DropdownContext);
  return <StyledDropdownPopUp $isOpen={isOpen}>{children}</StyledDropdownPopUp>;
};

const Item = ({ children, onClick }) => {
  const { setIsOpen } = useContext(DropdownContext);
  return (
    <StyledDropdownItem
      onClick={() => {
        onClick();
        setIsOpen(false);
      }}
    >
      {children}
    </StyledDropdownItem>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;
