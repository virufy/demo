import React from 'react';
import facebookSvg from 'assets/social/facebook.svg';
import instagramSvg from 'assets/social/instagram.svg';
import linkedInSvg from 'assets/social/linkedIn.svg';
import twitterSvg from 'assets/social/twitter.svg';
import { SocialIconsContainer, StyledImg } from './style';

interface SocialIcon {
  href: string;
  imgSrc: string;
}

const icons: SocialIcon[] = [
  {
    href: 'https://twitter.com/VirufyOrg',
    imgSrc: twitterSvg,
  },
  {
    href: 'https://www.facebook.com/Virufy/',
    imgSrc: facebookSvg,
  },
  {
    href: 'https://www.instagram.com/virufyorg/',
    imgSrc: instagramSvg,
  },
  {
    href: 'https://www.linkedin.com/company/virufy/',
    imgSrc: linkedInSvg,
  },
];

const SocialIcons = () => (
  <SocialIconsContainer>
    { icons.map(({ href, imgSrc }) => (
      <a
        key={href}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
      >
        <StyledImg src={imgSrc} />
      </a>
    ))}
  </SocialIconsContainer>
);

export default React.memo(SocialIcons);
