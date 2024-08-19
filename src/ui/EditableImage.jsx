import styled from 'styled-components';

const StyledEditableImage = styled.div`
  height: 232px;
  width: 232px;
  background-image: url('https://storage.googleapis.com/musify-e101c.appspot.com/cinamonroll.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

function EditableImage() {
  return <StyledEditableImage />;
}

export default EditableImage;
