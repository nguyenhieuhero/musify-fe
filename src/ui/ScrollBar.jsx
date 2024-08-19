import styled from 'styled-components';

export const Scrollable = styled.div`
  overflow-y: auto;
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 12px; /* Adjust width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; /* Default color of the scrollbar thumb */
    border-radius: 6px; /* Rounded corners for the scrollbar thumb */
    border: 3px solid #f5f5f5; /* Padding around the scrollbar thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Color of the scrollbar thumb on hover */
  }

  &::-webkit-scrollbar-track {
    background-color: #f5f5f5; /* Background color of the scrollbar track */
    border-radius: 6px; /* Rounded corners for the scrollbar track */
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent; /* Bottom-right corner where both scrollbars meet */
  }
`;
