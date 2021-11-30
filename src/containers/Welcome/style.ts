import styled, { css } from 'styled-components';

// Components
import { ReactComponent as Logo } from 'assets/virufyLogo.svg';
import { ReactComponent as CoupleAboutUsSVG } from 'assets/images/coupleAboutUs.svg';
import { ReactComponent as ArrowRight } from 'assets/icons/arrowRight.svg';
import { ReactComponent as LogoSplash } from 'assets/images/logoSplash.svg';

interface WelcomeTitleProps {
  fontSize?: number;
  fontColor?: string;
  mt?: number;
  mb?: number;
  textAlign?: 'center' | 'left';
}

interface WelcomeSubtitleProps {
  fontColor?: string;
  mt?: number,
  mb?: number;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: string;
  isBold?: boolean;
}

interface WelcomeNoteProps {
  isBold?: boolean;
}
interface NextButtonProps {
  alignSelf?: string;
  isDisable?: boolean;
}

export const WelcomeLogo = styled(Logo)`
  display: none; 

  @media screen and (${props => props.theme.breakpoints.tablet}){
    display: block;
    margin: 0 auto;

    width: 156px;
    height: 93px;
  }
`;

export const ArrowRightSVG = styled(ArrowRight)`
    display: block;
    margin: 0 auto;
    
    width: 32px;
    height: 32px;
`;

export const WelcomeLogoText = styled.div`
  font-family: 'Source Sans Pro'; /* It could be removed if default on body changes */
  font-size: 0.75rem;
  line-height: 0.75;
  text-align: center;
  color: ${props => props.theme.colors.purple};
`;

export const ShapeDownContainer = styled.div`
  width:100%;
  background-color: ${({ theme }) => theme.colors.purple_10};
  padding-top: 55px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    background-color: #FFF;
  }
`;

export const WelcomeHeaderContainer = styled.div`
  width:100%;
  background-color: ${({ theme }) => theme.colors.purple_10};
  display:flex;
  flex-direction:column;
  align-items: center; 
  margin:0px;
  padding-top: 20px;
`;

export const WelcomeTitle = styled.h1<WelcomeTitleProps>`
  font-family: "Open Sans";
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '1.5rem')};
  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ mt }) => `${mt || 11}px`};
  margin-bottom: ${({ mb }) => `${mb || 16}px`};
  max-width: 320px;
  text-align: ${({ textAlign }) => textAlign || 'center'};
  color: ${({ theme, fontColor }) => (fontColor || theme.colors.mineShaft)};
  line-height: 1;

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

export const WelcomeContent = styled.div<{ maxWidth?: number; mt?: number; mb?: number;}>`
  margin: ${({ mt = 30 }) => mt}px auto ${({ mb = 30 }) => mb}px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  ${({ maxWidth }) => maxWidth !== undefined && css`max-width: ${maxWidth}px;`}

  @media screen and (${props => props.theme.breakpoints.tablet}){
    text-align: center;
    margin: ${({ mt = 30 }) => mt}px auto ${({ mb = 30 }) => mb}px;
  };
`;

export const WelcomeItemList = styled.ul`
  color: ${props => props.theme.colors.mineShaft};
  display: flex;
  flex-direction: column;
  font-family: "Source Sans Pro";
  font-size: 0.875rem; 
  font-weight: 400;
  line-height: 1.25rem;
  list-style: none;
  margin: 0px 0px 1.2rem 25px;
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
    background-color: ${props => props.theme.colors.purple};
    border-radius: 50%;
    content: '';
    display: inline-block;
    margin-right: 8px;
    position: relative;
    top: -2.5px;

    height: 6px;
    width: 6px;
  }

  &:not(:first-of-type){
      margin-top: 1.25rem;
    }
`;

export const WelcomeSubtitle = styled.h2<WelcomeSubtitleProps>`
  color: ${({ theme, fontColor }) => (fontColor || theme.colors.mineShaft)};
  font-family: "Source Sans Pro";
  ${({ fontSize = 14 }) => css`font-size: ${fontSize}px;`}
  ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight}px;`}
  margin-bottom: ${({ mb }) => `${mb}px`};
  margin-left: auto;
  margin-right: auto;
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

  max-width: 335px;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 348px;
  }
`;

export const WelcomeSubtitleBold = styled.h2<WelcomeSubtitleProps>`
  color: ${({ theme, fontColor }) => (fontColor || theme.colors.mineShaft)};
  font-family: "Biko";
  ${({ fontSize = 14 }) => css`font-size: ${fontSize}px;`}
  ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight}px;`}
  margin-bottom: ${({ mb }) => `${mb}px`};
  margin-left: auto;
  margin-right: auto;
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

  max-width: 335px;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 348px;
  }
`;

export const WelcomeStyledForm = styled.form``;

export const WelcomeStyledFormAlternative = styled.form`
    padding: 0px !important; 
    text-align: center !important;
    @media screen and (${props => props.theme.breakpoints.tablet}){
      padding: 0px !important;
    }
`;

export const WelcomeRequiredFieldText = styled.span`
  color: ${props => props.theme.colors.red};
`;

export const RegionContainer = styled.div`
  margin-top: 8px;
  text-align: center;
`;

export const WelcomeConsentForm = styled.div`
    max-width: 320px;
    margin: 10px auto 20px auto;

    @media screen and (${props => props.theme.breakpoints.tablet}){
      margin: 24px auto 28 auto;
      max-width: 470px;
    }
`;

export const WelcomeBorderContainer = styled.div`
    width:100%;
    border-radius: 0px 70px 0px 0px;
    background-color: #FFF;
    display: flex;
    justify-content: center;
`;

export const CoupleAboutUs = styled(CoupleAboutUsSVG)`
  margin: -40px auto 16px;
  width: 220px; 
  height: 199px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin: 0px auto 14px;
    width: 320px; 
    height: 299px;
  }
`;

export const WelcomeNote = styled.span<WelcomeNoteProps>`
  font-family: "Source Sans Pro";
  font-size: 12px;
  line-height: 1.42;
  font-style: italic;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  max-width: 335px;
  margin: 25px auto 0;
  text-align:left;
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
  border: 0;
  background-color: ${({ theme }) => theme.colors.purple_5};
  color: ${({ theme }) => theme.colors.mineShaft};
  border-radius: 15px;
  width: 100%;
  font-family: 'Source Sans Pro';
  line-height: 24px;
  padding: 12px 15px;
  margin: 0 auto;
  max-width: 335px;
  font-size:14px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.mineShaft_50};
  }
  @media screen and (${({ theme }) => theme.breakpoints.tablet}){
    max-width: 348px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const ContainerNextButton = styled.div`
  width: 100%;
  margin: auto;
  max-width: 335px;
  display:flex;
  justify-content:flex-end;

  @media screen and (${({ theme }) => theme.breakpoints.tablet}){
    max-width: 348px;
    display:flex;
    justify-content: center;
  }
`;

export const NextButton = styled.button<NextButtonProps>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.purple_10}; 
  opacity: ${({ isDisable }) => (isDisable ? '0.5' : '1')};
  border: 0px;
  margin-bottom: 30px;
  margin-top: 97px;
  margin-right: 10px;
`;

export const WelcomeBullets = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.purple_10}; 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

export const BulletIndicator = styled.p`
  color: ${({ theme }) => theme.colors.purple}; 
  font-weight: bold;
  margin:0px;
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

export const SupportersTitle = styled.div`
  margin-top: 20px;

  color: ${props => props.theme.colors.darkBlack};
  font-family: "Open Sans";
  font-size: 0.875rem;
  line-height: 1.6;
  font-weight: 700;
`;

export const SupportersLogos = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const HeaderImageContainer = styled.div`
  position: relative;
  min-width: 375px;
  height: 325px;
  margin-bottom: 30px;

@media screen and (${props => props.theme.breakpoints.tablet}){
  max-width: 768px;
  height: 488px;
}
`;
export const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const LogoWhiteBG = styled(LogoSplash)`
  width: 134px;
  height: 177px;
  margin: auto;
  position: absolute;
  margin-left: -68%;
  top: 26%;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    width: 212px;
    height: 280px;
  }
`;
