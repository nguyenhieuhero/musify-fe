import styled from 'styled-components';
import EditableImage from './EditableImage';

const StyledHeader = styled.div`
  display: flex;
  align-items: end;
`;

function Header({ title }) {
  console.log(name);
  return (
    <StyledHeader>
      <EditableImage />
      <h1>{title}</h1>
    </StyledHeader>
  );
}

export default Header;
