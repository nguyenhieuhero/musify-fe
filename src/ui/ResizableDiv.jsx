import styled from 'styled-components';

const StyledResizableDiv = styled.div`
  height: 91vh;
  width: 20vw;
  background-color: red;
`;
function ResizableDiv({ children }) {
  return <StyledResizableDiv>{children}</StyledResizableDiv>;
}

export default ResizableDiv;
