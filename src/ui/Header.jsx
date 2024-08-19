import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: #181818;
  padding: 20px;
  border-radius: 8px;
  margin: 30px 0;
  position: relative;
`;

const HeaderImage = styled.img`
  height: 220px;
  width: 220px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
`;

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  color: white;
  max-width: 60%;
`;

const HeaderTitle = styled.h1`
  font-size: 25px;
  margin: 0;
  margin-bottom: 10px;
  line-height: 1.2;
`;

const HeaderName = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 10px;
  line-height: 1.2;
`;

const HeaderDescription = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  margin-bottom: 8px;
  color: #b3b3b3;
`;

const SettingIconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

function Header({ title = 'playlist', image, name, description, settingIcon }) {
  return (
    <HeaderContainer>
      <HeaderImage
        src={
          image
            ? image
            : 'https://storage.googleapis.com/musify-e101c.appspot.com/user/ee2e27d0-02c9-4ed3-ac53-81b3194a60df.jpg'
        }
        alt={name}
      />
      <HeaderTextContainer>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderName>{name}</HeaderName>
        {description && <HeaderDescription>{description}</HeaderDescription>}
      </HeaderTextContainer>
      {settingIcon && (
        <SettingIconContainer>{settingIcon}</SettingIconContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;
