import { useState, createContext, useContext } from 'react';
import styled from 'styled-components';

const PopupContext = createContext();

const StyledPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPopupContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Popup = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PopupContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </PopupContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { setIsOpen } = useContext(PopupContext);
  return <div onClick={() => setIsOpen(true)}>{children}</div>;
};

const Content = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(PopupContext);

  if (!isOpen) return null;

  return (
    <StyledPopupOverlay onClick={() => setIsOpen(false)}>
      <StyledPopupContent onClick={(e) => e.stopPropagation()}>
        {children}
      </StyledPopupContent>
    </StyledPopupOverlay>
  );
};

const Header = ({ children }) => <div>{children}</div>;
const Body = ({ children }) => <div>{children}</div>;
const Footer = ({ children }) => <div>{children}</div>;

Popup.Trigger = Trigger;
Popup.Content = Content;
Popup.Header = Header;
Popup.Body = Body;
Popup.Footer = Footer;

export default Popup;
