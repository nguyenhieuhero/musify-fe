import { createContext, useContext } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useAppContext } from '../contexts/AppContext';

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
  z-index: 1000; /* Ensure it covers the entire screen */
`;

const StyledPopupContent = styled.div`
  background: ${({ bgColor }) => bgColor || 'white'};
  color: ${({ textColor }) => textColor || 'black'}; /* Use textColor prop */
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  /* Ensure all child elements inherit the text color */
  & * {
    color: inherit;
  }
`;

const Popup = ({ children }) => {
  const { isModalOpen, setIsModalOpen } = useAppContext();

  return (
    <PopupContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </PopupContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { setIsModalOpen } = useContext(PopupContext);
  return <Button onClick={() => setIsModalOpen(true)}>{children}</Button>;
};

const Content = ({ children, bgColor = '#282828', textColor = '#ffffff' }) => {
  const { isModalOpen, setIsModalOpen } = useContext(PopupContext);

  if (!isModalOpen) return null;

  return (
    <StyledPopupOverlay onClick={() => setIsModalOpen(false)}>
      <StyledPopupContent
        bgColor={bgColor}
        textColor={textColor}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </StyledPopupContent>
    </StyledPopupOverlay>
  );
};

const CloseButton = ({ children }) => {
  const { setIsModalOpen } = useContext(PopupContext);
  return <Button onClick={() => setIsModalOpen(false)}>{children}</Button>;
};

const Header = ({ children }) => <div>{children}</div>;
const Body = ({ children }) => <div>{children}</div>;
const Footer = ({ children }) => <div>{children}</div>;

Popup.Trigger = Trigger;
Popup.Content = Content;
Popup.Header = Header;
Popup.Body = Body;
Popup.Footer = Footer;
Popup.CloseButton = CloseButton;

export default Popup;
