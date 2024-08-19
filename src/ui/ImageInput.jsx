import { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImageInput = ({ image, onImageChange }) => {
  const [imagePreview, setImagePreview] = useState(image);

  const handleImageClick = () => {
    document.getElementById('image-upload').click();
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    onImageChange(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ImageContainer>
      <ImagePreview
        src={imagePreview || 'https://via.placeholder.com/100'}
        alt="Preview"
        onClick={handleImageClick}
      />
      <HiddenInput id="image-upload" type="file" onChange={handleInputChange} />
    </ImageContainer>
  );
};

export default ImageInput;
