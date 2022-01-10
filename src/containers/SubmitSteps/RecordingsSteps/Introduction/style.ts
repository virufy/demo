import styled, { css } from 'styled-components';
import { BlackText } from 'components/Texts';

// Assets
import { ReactComponent as SocialDistancingSVG } from 'assets/images/social-distancing.svg';
import { ReactComponent as CoughLeftSVG } from 'assets/images/cough-left.svg';

interface InstructionSubtitleProps {
  fontColor?: string;
  mt?: number,
  mb?: number;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: string;
  isBold?: boolean;
}

export const MainContainer = styled.div`
  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin-left: auto;
}
`;

export const InstructionsHeaderContainer = styled.div`
  width:100%;
  background-color: ${({ theme }) => theme.colors.purple_10};
  display:flex;
  flex-direction:column;
  align-items: center; 
  margin:0px;
  padding-top: 20px;
  border-radius: 0px 0px 50px 70px;
`;
export const InstructionTitle = styled.div`
  width: 100%;
  height: 29px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;

  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;

  color: ${props => props.theme.colors.mineShaft};
`;

export const Text = styled(BlackText).attrs({ dark: true })`
  margin-bottom: 24px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 40px;
    font-size: 16px;
  }
`;

export const InstructionContainer = styled.div<{mt?: number; mb?: number;}>`
  display:flex;
  margin: ${({ mt = 30 }) => mt}px auto ${({ mb = 30 }) => mb}px;
  @media screen and (${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

export const InstructionSubtitle = styled.h2<InstructionSubtitleProps>`
  color: ${({ theme, fontColor }) => (fontColor || theme.colors.mineShaft)};
  font-family: "Source Sans Pro";
  ${({ fontSize = 14 }) => css`font-size: ${fontSize}px;`}
  ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight}px;`}
  margin-bottom: ${({ mb }) => `${mb}px`};
  margin-right: 20px;
  margin-top: ${({ mt }) => `${mt}px`};
  ${({ textAlign }) => textAlign && css`text-align: ${textAlign || 'left'};`}
  white-space: pre-wrap;
  font-weight: 200;
  >strong{
    font-weight: ${({ isBold }) => (isBold ? 600 : 200)}
  }
  >p>strong{
    font-weight: ${({ isBold }) => (isBold ? 600 : 200)}
  }

  max-width: 289px;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin-left: 0px;
    max-width: 348px;
  }
`;

export const InstructionBullets = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.purple_10}; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 16px 0px 20px;
  
  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin: 0px 1rem;
  }
`;

export const BulletIndicator = styled.p`
  color: ${({ theme }) => theme.colors.purple}; 
  font-weight: bold;
  margin:0px;
`;

// export const TopImage = styled.img`
export const SocialDistancing = styled(SocialDistancingSVG)`
  width: 155px;
  height: 90px;
  margin: 0 auto;
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 205px;
    height: 140px;
  }
`;

export const BottomImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomImageLeft = styled.img`
  width: 45px;
  height: 67px;
  margin-right: 17px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 108px;
    height: 161px;
  }
`;

// export const BottomImageRight = styled.img`
export const CoughLeft = styled(CoughLeftSVG)`
  width: 76px;
  height: 108px;
  margin: 0 auto;
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 126px;
    height: 158px;
  }
`;
