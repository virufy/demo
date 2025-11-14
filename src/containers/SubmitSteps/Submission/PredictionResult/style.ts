import styled from 'styled-components';

// Images
import { ReactComponent as HighSVG } from 'assets/images/high.svg';
import { ReactComponent as LowSVG } from 'assets/images/low.svg';
import { ReactComponent as ProcessingSVG } from 'assets/images/processing.svg';
import { ReactComponent as PredictionResultSVG } from 'assets/images/prediction-result.svg';
import { ReactComponent as VLogoSVG } from 'assets/VLogo.svg';

// Shared style
import { IntroductionText } from 'containers/Welcome/style';

export const ProcessingContainer = styled.div`
  margin: 0px;
  padding: 0px;
  /* Add centering for processing state as well */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
  width: 100%; /* Ensure it spans full width */
`;

export const Title = styled.h1`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 48px;
  color: ${props => props.theme.colors.darkBlack};
  text-align: center; /* This is already good for text inside */
  margin: 46px auto 0px auto; /* Ensure left/right margins are auto to center the block */
`;

export const ImageProcessing = styled(ProcessingSVG)`
  width: 100%;
  height: 371px;
  display: block;
  margin: 69px auto 0px auto; /* Add auto for horizontal centering */

  @media screen and (${props => props.theme.breakpoints.tablet}){
    width: 100%;
  }
`;

export const PredictionResultContainer = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex; /* Make it a flex container */
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally along the cross-axis */
  width: 100%; /* Ensure it takes full available width */
`;

export const TitleResult = styled.h1<{ color?: string; }>`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  color: ${({ theme, color }) => (color || theme.colors.mineShaft)};
  text-align: center; /* This is already good for text inside */
  margin: 44px auto 10px auto; /* Change left/right margin to auto to center the block */

  @media screen and (${props => props.theme.breakpoints.tablet}){
    text-align: center;
  }
`;

export const LikelihoodText = styled.div`
  background: ${props => props.theme.colors.darkBlack_04};
  box-sizing: border-box;
  border-radius: 15px;

  font-family: 'Source Sans Pro';
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.mineShaft};

  text-align: center;
  white-space: nowrap;
  margin: 0 auto; /* Center the block itself */

  @media screen and (${props => props.theme.breakpoints.tablet}){
    width: fit-content;
    padding: 0 12px;
  }
`;

export const LikelihoodPercentageText = styled.span`
  display: block;
  color: ${props => props.theme.colors.green};

  font-size: 24px;
  line-height: 1.42;
  /* margin-top: 16px; */
  text-align: center; /* Ensure text inside is centered */
`;

export const ImagePredictionResult = styled(PredictionResultSVG)`
  width: 100%;
  max-height: 330px;
  margin: 0 auto 43px auto; /* Add auto for horizontal centering */
  display: block; /* Ensure it's a block to respect margin: auto */

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 714px;
    margin-top: 70px;
  }
`;

export const VLogo = styled(VLogoSVG)`
  width: 100%;
  max-height: 195px;
  margin: 0 auto 175px auto; /* Add auto for horizontal centering */
  display: block; /* Ensure it's a block to respect margin: auto */

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 714px;
    margin-top: 97px;
  }
`;

export const SubmitText = styled.p`
  font-family: 'Source Sans Pro';
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme.colors.darkGray_70};
  margin: 0 auto; /* Center the block itself */
  text-align: center; /* Center the text inside */
`;

export const SubmitError = styled(SubmitText)`
  color: ${props => props.theme.colors.red};
  text-align: center;
  margin-top: 30px;
  @media screen and (${props => props.theme.breakpoints.tablet}){
    margin-top: 50px;
  }
`;

export const IntroText = styled(IntroductionText)`
  max-width: 100%;
  margin: 0px auto 24px auto; /* Ensure left/right margin is auto to center the block */
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
  text-align: center; /* Ensure text inside is centered */

  >strong{
    font-weight: 600;
  }
  >i {
    margin-top: 20px;
    display: block;
  }

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 470px;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const StyledLow = styled(LowSVG)`
  margin: 37px auto -20px auto; /* Ensure left/right margin is auto to center the SVG */
  display: block;
`;

export const StyledHigh = styled(HighSVG)`
  margin: 37px auto -20px auto; /* Ensure left/right margin is auto to center the SVG */
  display: block;
`;