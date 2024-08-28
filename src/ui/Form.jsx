import styled from 'styled-components';
import ImageInput from './ImageInput';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #143e87;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #144394;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #143e87;
`;

Form.Input = Input;
Form.ImageInput = ImageInput;
Form.Button = Button;
Form.Title = Title;

export default Form;
