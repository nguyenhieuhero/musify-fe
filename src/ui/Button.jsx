import styled from 'styled-components';

const StyledButton = styled.button`
  height: auto;
  width: auto;
  background-color: blue;
`;

function Button({ onClick, children }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
