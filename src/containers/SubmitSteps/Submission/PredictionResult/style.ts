import styled from 'styled-components';

// Images
import { ReactComponent as ProcessingSVG } from 'assets/images/processing.svg';
import { ReactComponent as PredictionResultSVG } from 'assets/images/prediction-result.svg';

export const ProcessingContainer = styled.div``;

export const Title = styled.h1`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 48px;
  color: ${props => props.theme.colors.darkBlack};
  text-align: center;
  margin: 140px auto 0px;
`;

export const ImageProcessing = styled(ProcessingSVG)`
  width: 287px;
  height: 221px;
  margin: 80px auto 0px;
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    width: 100%;
    max-width: 714px;
  }
`;

export const PredictionResultContainer = styled.div``;

export const TitleResult = styled.h1`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 48px;
  color: ${props => props.theme.colors.darkBlack};
  text-align: left;
  margin: 33px 0px 0px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    text-align: center;
  }
`;

export const LikelihoodText = styled.div`
  margin: 92px auto 0px;
  padding: 0 6px;
  background: ${props => props.theme.colors.realWhite};
  border: 1px solid ${props => props.theme.colors.mercury};
  box-sizing: border-box;
  border-radius: 4px;

  font-family: 'Source Sans Pro';
  font-weight: bold;
  font-size: 20px;
  line-height: 48px;
  color: ${props => props.theme.colors.mineShaft};

  text-align: center;
  white-space: nowrap;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    width: fit-content;
    padding: 0 12px;
  }
`;

export const LikelihoodPercentageText = styled.span``;

export const ImagePredictionResult = styled(PredictionResultSVG)`
  margin: 97px 0px 26px -25px;
  width: 100%;
  height: 100%;
  max-width: 351px;
  max-height: 249px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    max-width: 714px;
    margin: 97px 0px 26px;
  }
`;

export const SubmitText = styled.p`
  font-family: 'Source Sans Pro';
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme.colors.darkGray_70};
  margin: 0;

`;

export const SubmitError = styled(SubmitText)`
  color: ${props => props.theme.colors.red};
  text-align: center;
`;
