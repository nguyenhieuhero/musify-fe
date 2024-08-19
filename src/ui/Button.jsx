import styled from 'styled-components';

const StyledButton = styled.button`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: ${({ size }) => size || '35px'};
  width: ${({ size }) => size || '35px'};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: transparent; /* Main background transparent */
  color: white; /* Icon or text color */
  padding: 0;
  transition: color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ hoverBgColor }) => hoverBgColor || 'gray'};
    opacity: 0; /* Initially fully transparent */
    transition: opacity 0.3s ease;
    border-radius: 50%;
    z-index: -1; /* Background behind the content */
  }

  &:hover::before {
    opacity: 0.8; /* Background appears on hover */
  }

  &:focus {
    outline: none;
  }
`;

function Button({ onClick, size, hoverBgColor, children }) {
  return (
    <StyledButton onClick={onClick} size={size} hoverBgColor={hoverBgColor}>
      {children}
    </StyledButton>
  );
}

export default Button;
