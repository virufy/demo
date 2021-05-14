import styled from 'styled-components';
import { ReactComponent as ArrowftSvg } from 'assets/icons/arrowLeft.svg';
import { ReactComponent as CloseX } from 'assets/icons/closeX.svg';

export type HeaderType = 'shapeDown' | 'noShape' | 'shapeUp';

export const HeaderContainer = styled.div<{ backgroundType?: HeaderType; }>`
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 1.3rem;
  position:relative;
  width: 100%;
  background-color: ${({ backgroundType }) => {
    switch (backgroundType) {
      case 'noShape':
        return '#FFF';
      case 'shapeDown':
        return 'rgba(53, 120, 222, 0.1)';
      case 'shapeUp':
      default:
        return 'rgba(53, 120, 222, 0.1)';
    }
  }};
  border-radius: ${({ backgroundType }) => {
    switch (backgroundType) {
      case 'noShape':
        return '0px';
      case 'shapeDown':
        return '0px';
      case 'shapeUp':
      default:
        return '0px 0px 70px 70px';
    }
  }};

  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding-top: 1.3rem;
  }
`;

export const TitleContainer = styled.div`
  display:flex;
  flex-direction: column;
`;

export type LogoSize = 'regular' | 'big';

export const LogoDemo = styled.img<{ size?: LogoSize }>`
  margin: 0 auto;
  width: ${({ size }) => {
    switch (size) {
      case 'big':
        return '156px';
      case 'regular':
      default:
        return '75px';
    }
  }};
  margin-top: ${({ size }) => {
    switch (size) {
      case 'big':
        return '80px';
      case 'regular':
      default:
        return '0px';
    }
  }};


@media screen and (${props => props.theme.breakpoints.tablet}){

  }
`;

export const Subtitle = styled.h1<{ colorType?: HeaderType; pb?: number; mt?: number}>`
  font-family: ${({ colorType }) => {
    switch (colorType) {
      case 'shapeDown':
        return 'Biko';
      default:
        return 'Open Sans';
    }
  }};
  font-weight: 700;
  line-height: 1.1;
  margin: 0 auto;
  padding-bottom: ${({ pb }) => `${pb || 0}px`}};
  font-size: ${({ colorType }) => {
    switch (colorType) {
      case 'noShape':
        return '32px';
      case 'shapeDown':
        return '32px';
      case 'shapeUp':
      default:
        return '24px';
    }
  }};
  color: ${({ colorType }) => {
    switch (colorType) {
      case 'noShape':
        return '#393939';
      case 'shapeDown':
        return '#3578DE';
      case 'shapeUp':
      default:
        return '#393939';
    }
  }};
  text-align: center;
  margin-top: ${({ mt }) => `${mt || 33}px`}};
  
  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding-top: 0;
  }
`;

export const Title = styled.h3<{ pb?: number;}>`
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: bold;
  line-height: 1.1;
  margin: 0 auto;
  color: ${props => props.theme.colors.purple};
  text-align: center;
  padding-bottom: ${({ pb }) => `${pb || 0}px`}};

  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding-top: 0;
  }
`;

export const ArrowLefContainer = styled.div`
  cursor: pointer;
  padding-bottom: 10px;
  padding-left: 20px;
  position: absolute;
  left:-8px;
  top: 20px;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding: 0px 20px;
    > svg {
      width: 13.62px;
      height: 23.1px;
    }
  }
`;

export const ArrowLeft = styled(ArrowftSvg)`
  fill: ${props => props.theme.colors.purple};
`;

export const CloseLeft = styled(CloseX)`
  fill: ${props => props.theme.colors.purple};
`;
