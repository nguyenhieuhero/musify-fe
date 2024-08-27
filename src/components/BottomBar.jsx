import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faYoutube,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';

const FooterContainer = styled.div`
  position: relative;
  background-color: #060f1f;
  padding: 20px 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  color: antiquewhite;
`;

const FooterLink = styled.a`
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: green;
  }
`;

const FooterSocialIcon = styled.div`
  cursor: pointer;
  margin: 0 5px;

  svg {
    color: inherit;
    transition: color 0.2s ease-in-out;
  }

  svg:hover {
    color: antiquewhite;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLink>Author: Nguyễn Minh Hiếu</FooterLink>
        <FooterLink href="https://open.spotify.com/" target="_blank">
          Tham khảo thiết kế từ: <FontAwesomeIcon icon={faSpotify} />
        </FooterLink>
        <FooterLink href="mailto:nguyenhieuhero16@gmail.com">
          Email: nguyenhieuhero16@gmail.com
        </FooterLink>
      </FooterContent>
      <FooterSocialIcon>
        <a
          href="https://www.facebook.com/profile.php?id=100004749408014"
          target="_blank"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
      </FooterSocialIcon>
      <FooterSocialIcon>
        <a
          href="https://www.youtube.com/channel/UCn-LYukdkgT2ndgcGAuBl6w"
          target="_blank"
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
      </FooterSocialIcon>
    </FooterContainer>
  );
}
