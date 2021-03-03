import styled, { css } from 'styled-components';
import { ReactComponent as Logo } from 'assets/virufyLogo.svg';
import { ReactComponent as WomanWithPhoneFrontSvg } from 'assets/images/womanWithPhoneFront.svg';

interface WelcomeTitleProps {
  fontSize?: number;
  mt?: number;
  mb?: number;
}

interface WelcomeSubtitleProps {
  fontColor?: string;
  mt?: number,
  mb?: number;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: string;
}

interface WelcomeNoteProps {
  isBold?: boolean;
}

export const WelcomeLogo = styled(Logo)`
   display: none;

    @media screen and (${props => props.theme.breakpoints.tablet}){
      display: block;
      margin: 0 auto;

      width: 112px;
      height: 60px;
    }
`;

export const WelcomeTitle = styled.h1<WelcomeTitleProps>`
  color: ${props => props.theme.colors.darkBlack};
  font-family: "Open Sans";
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '1.5rem')};
  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ mt }) => `${mt || 11}px`};
  margin-bottom: ${({ mb }) => `${mb || 16}px`};
  max-width: 320px;
  text-align: left;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    font-size: ${({ fontSize }) => `${fontSize}px` || '2.25rem'} ;
    margin: 50px auto 30px auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${({ mt }) => `${mt || 50}px`};
    margin-bottom: ${({ mb }) => `${mb || 30}px`};
    max-width: initial;
    text-align: center;
  }
`;

export const WelcomeContent = styled.div`
  margin: 30px auto 0px auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    text-align: center;
    margin: 30px auto;
  };
`;

export const WelcomeItemList = styled.ul`
  color: ${props => props.theme.colors.ultraDarkBlack};
  display: flex;
  flex-direction: column;
  font-family: "Source Sans Pro";
  font-size: 0.875rem; 
  font-weight: 400;
  line-height: 1.25rem;
  list-style: none;
  margin: auto;
  max-width: 278px;
  padding: 0;

  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: auto;
    font-size: 1rem;
    max-width: 347px;
  };
`;

export const WelcomeItemListItem = styled.li`
  padding: 0;
  text-align: left;
  text-indent: -12px;


  &:before {
    background-color: ${props => props.theme.colors.darkBlack};
    border-radius: 50%;
    content: '';
    display: inline-block;
    margin-right: 8px;
    position: relative;
    top: -2.5px;

    height: 4px;
    width: 4px;
  }

  &:not(:first-of-type){
      margin-top: 1.25rem;
    }
`;

export const WelcomeSubtitle = styled.h2<WelcomeSubtitleProps>`
  color: ${({ theme, fontColor }) => (fontColor || theme.colors.ultraDarkBlack)};
  font-family: "Source Sans Pro";
  ${({ fontSize = 14 }) => css`font-size: ${fontSize}px;`}
  ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight}px;`}
  font-weight: ${props => props.fontWeight};
  margin-bottom: ${({ mb }) => `${mb}px`};
  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ mt }) => `${mt}px`};
  ${({ textAlign }) => textAlign && css`text-align: ${textAlign || 'left'};`}
  white-space: pre-wrap;

  max-width: 320px;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    font-size: 1rem;
    max-width: 348px;
  }
`;

export const WelcomeSubtitleBold = styled(WelcomeSubtitle).attrs({
  as: 'span',
})`
  font-weight: 700;
`;

export const WelcomeStyledForm = styled.form`
    @media screen and (${props => props.theme.breakpoints.tablet}){
      padding-top: 102px;
    }
`;

export const WelcomeStyledFormAlternative = styled.form`
    @media screen and (${props => props.theme.breakpoints.tablet}){
      padding-top: 32px;
      padding-bottom: 24px;
    }
`;

export const WelcomeRequiredFieldText = styled.span`
  color: ${props => props.theme.colors.red};
`;

export const WelcomeConsentForm = styled.div`
    max-width: 320px;
    margin: 10px auto 20px auto;

    @media screen and (${props => props.theme.breakpoints.tablet}){
      margin: 24px auto 28 auto;
      max-width: 470px;
    }
`;

export const WomanWithPhoneFront = styled(WomanWithPhoneFrontSvg)`
  margin: 2px auto 16px;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: -20px auto 14px;
  }
`;

export const WelcomeNote = styled.span<WelcomeNoteProps>`
  font-family: "Source Sans Pro";
  font-size: 0.875rem;
  font-style: italic;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  line-height: 1.5rem;
`;

export const WelcomeJumpToBottomContainer = styled.div`
    max-width: 470px;
    width: 100%;
    margin: 25px auto;

    @media screen and (${props => props.theme.breakpoints.tablet}){
      margin: 24px auto 28 auto;
      max-width: 470px;
    }
`;

export const WelcomeInput = styled.input`
  height: 50px;
  border: 1px solid #E6E6E6;
  border-radius: 4px;
  width: 100%;
  font-family: 'Source Sans Pro';
  line-height: 24px;
  padding: 13px 14px;
  margin: 0 6px;
  max-width: calc(100% - 12px);

  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholderGray};
  }
  @media screen and (${({ theme }) => theme.breakpoints.tablet}){
    max-width: 348px;
    padding: 13px 30px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const IntroductionText = styled.div`
  font-family: "Source Sans Pro";
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.mineShaft};
  max-width: 320px;
  margin: 12px auto 0;
  text-align: left;

  > a {
    font-weight: normal;
  }
`;

export const IntroductionRecommendations = styled(IntroductionText)`
  margin: 10px auto 0;

  > p {
    margin: 1rem 21px 0;

    &:first-of-type {
      margin-top: 12px;
    }
  }
`;
