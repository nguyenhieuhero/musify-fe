import styled from 'styled-components';

const StyledEditableImage = styled.div`
  height: 232px;
  width: 232px;
  background-image: url('https://mosaic.scdn.co/300/ab67616d00001e020d0621554b1c6c9dbf3556beab67616d00001e022e8ed79e177ff6011076f5f0ab67616d00001e02dd0a40eecd4b13e4c59988daab67616d00001e02ff8d8c5662a96d41433e9ee1');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

function EditableImage() {
  return <StyledEditableImage />;
}

export default EditableImage;
