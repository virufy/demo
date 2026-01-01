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

export const VirufyLogo = styled.img`
  width: 96px;
  height: auto;
  display: block;
  margin: 5px auto 5px auto;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    width: 132px;
    margin-top: 36px;
  }
`;

export const Title = styled.h1`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  color: ${props => props.theme.colors.darkBlack};
  text-align: center; /* This is already good for text inside */
  margin: 18px auto 0px auto; /* Ensure left/right margins are auto to center the block */
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

export const ResultCard = styled.div`
  width: calc(100% - 40px);
  max-width: 520px;
  background: ${props => props.theme.colors.darkBlack_04};
  border-radius: 22px;
  padding: 22px 18px;
  box-sizing: border-box;
  margin: 16px auto 18px auto;
`;

export const CardTitle = styled.div`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 34px;
  color: ${props => props.theme.colors.mineShaft};
  text-align: center;
  white-space: pre-line;
  margin-bottom: 12px;
`;

export const PercentageDisplay = styled.div<{ color: string }>`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 1.2;
  color: ${({ color }) => color};
  text-align: center;
  margin: 8px 0 16px 0;
`;

export const RiskText = styled.div<{ color?: string }>`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 1.05;
  text-align: center;
  white-space: pre-line;
  color: ${({ theme, color }) => color || theme.colors.mineShaft};
  margin: 0;
`;

export const CardBodyText = styled.div`
  font-family: 'Source Sans Pro';
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme.colors.darkGray_70};
  text-align: center;
  margin-top: 10px;
`;

export const SectionTitle = styled.h2`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  color: ${props => props.theme.colors.mineShaft};
  text-align: center;
  margin: 10px auto 10px auto;
`;

export const DiseaseList = styled.div`
  width: calc(100% - 40px);
  max-width: 520px;
  background: ${props => props.theme.colors.darkBlack_04};
  border-radius: 22px;
  padding: 18px;
  box-sizing: border-box;
  margin: 0 auto 12px auto;
`;

export const DiseaseRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.darkBlack_20};
  }
`;

export const DiseaseRowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.mineShaft};
`;

export const BarTrack = styled.div`
  width: 100%;
  height: 14px;
  border-radius: 999px;
  background: ${props => props.theme.colors.mercury};
  padding: 0px;
  box-sizing: border-box;
  overflow: hidden;
`;

export const BarFill = styled.div<{ widthPct: number; color: string }>`
  height: 100%;
  width: ${({ widthPct }) => `${Math.max(0, Math.min(100, widthPct))}%`};
  border-radius: 999px;
  background: ${({ color }) => color};
  border: 2px solid ${props => props.theme.colors.mineShaft};
  box-sizing: border-box;
`;

export const DividerLine = styled.div`
  width: calc(100% - 80px);
  max-width: 520px;
  height: 1px;
  background: ${props => props.theme.colors.darkBlack_20};
  margin: 18px auto 14px auto;
`;

export const GaugeWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 8px 0 0 0;
  height: 180px;
`;

export const GaugeRiskText = styled(RiskText)`
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  pointer-events: none;
`;