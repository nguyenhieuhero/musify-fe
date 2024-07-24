import styled from 'styled-components';
export const Scrollable = styled.div`
  overflow-y: auto;
  /* Custom scroll bar styles */
  &::-webkit-scrollbar {
    z-index: 100000;
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
    border: 3px solid #f5f5f5; /* Adjusts the padding around the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  &::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    /* border-radius: 10px; */
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent; /* For the bottom-right corner where both scrollbars meet */
  }
`;
