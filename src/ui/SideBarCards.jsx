import styled from 'styled-components';

const StyledLogoWithTextCard = styled.div``;

function SideBarCards({ onClick, children }) {
  return (
    <StyledLogoWithTextCard onClick={onClick}>
      {children}
    </StyledLogoWithTextCard>
  );
}

export default SideBarCards;
