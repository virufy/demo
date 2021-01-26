import styled from 'styled-components';
import { BlackText } from 'components/Texts';

// Assets
import { ReactComponent as SocialDistancingSVG } from 'assets/images/social-distancing.svg';
import { ReactComponent as CoughLeftSVG } from 'assets/images/cough-left.svg';

export const MainContainer = styled.div``;

export const InstructionTitle = styled.div`
  width: 100%;
  height: 29px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 160%;

  text-align: center;
  margin-bottom: 16px;
  margin-top: 32px;

  color: ${props => props.theme.colors.darkBlack};
`;

export const Text = styled(BlackText).attrs({ dark: true })`
  margin-bottom: 24px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 40px;
    font-size: 16px;
  }
`;

// export const TopImage = styled.img`
export const SocialDistancing = styled(SocialDistancingSVG)`
  width: 195px;
  height: 100px;
  margin: 0 auto 38px;
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 470px;
    height: 241px;
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
  height: 100px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 184px;
    height: 240px;
  }
`;
