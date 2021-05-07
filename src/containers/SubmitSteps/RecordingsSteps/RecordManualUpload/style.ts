import styled from 'styled-components';
import { colors } from 'theme';
import { BaseTitle, BlackText } from 'components/Texts';

// Assets
import { ReactComponent as Clouds } from 'assets/images/Clouds.svg';

export const MainContainer = styled.div`
  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 64px;
  }
`;

export const Title = styled(BaseTitle)`
  margin-top: 65px;
  margin-bottom: 16px;
  margin-left: 20px;

`;

export const Text = styled(BlackText)`
  margin-bottom: 125px;
  color: ${props => props.theme.colors.darkGray_70};

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    @media (orientation: portrait) {
      margin-bottom: 185px;
    }

    @media (orientation: landscape) {
      margin-bottom: 24px;
    }
  }
`;

export const TextAddFile = styled(BlackText).attrs({ dark: true, fontSize: '1rem' })`
  text-align: center;
  line-height: 24px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    font-size: 1.75rem;
  }
`;

export const TextFileConstraints = styled(BlackText).attrs({ dark: true, fontSize: '0.625rem' })`
  text-align: center;
  line-height: 24px;
  color: ${props => props.theme.colors.darkGray};

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    font-size: 1rem;
    margin-top: 20px;
  }
`;

export const TextErrorContainer = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.red};
  font-family: 'Source Sans Pro';
  display: 'flex';
  height: 50px;
`;

export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;
`;

export const UploadInput = styled.input`
  display: none;
`;

export const UploadButton = styled.label`
  width: 98px;
  height: 98px;
  background-color: ${colors.purple_10};
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  margin-top: -40%;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: ${colors.purple};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:before {
    width: 20px;
    height: 3px;
  }

  &:after {
    width: 3px;
    height: 20px;
  }

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 200px;
    height: 200px;
    margin-bottom: 30px;

    &:before {
      width: 65px;
      height: 9px;
    }

    &:after {
      width: 9px;
      height: 65px;
    }
  }
`;

export const CloudsSVG = styled(Clouds)`
  width: 197px;
  height: 122px;
  margin: 0 auto;
  margin-top: 110px;
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 374px;
    height: 299px;
  }
`;
