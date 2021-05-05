import styled from 'styled-components';

import { ReactComponent as ArrowftSvg } from 'assets/icons/arrowLeft.svg';
import { ReactComponent as LogoSvg } from 'assets/virufyLogo.svg';

export type HeaderType = 'primary' | 'secondary';

export const HeaderContainer = styled.div<{ backgroundType?: HeaderType; }>`
  align-items: center;
  display: flex;
  padding-top: 1rem;
  position:relative;
  width: 100%;
  background-color: ${({ backgroundType }) => {
    switch (backgroundType) {
      case 'primary':
        return '#FFF';
      case 'secondary':
      default:
        return 'rgba(53, 120, 222, 0.1)';
    }
  }}
  ;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding-top: 0px;
  }
`;

export type LogoSize = 'regular' | 'big';

export const Logo = styled(LogoSvg)<{ size?: LogoSize }>`
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
    display: none;
    }
`;

export const Title = styled.h1`
  font-family: "Open Sans";
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem;
  padding-top: 8px;
  margin: 0 auto;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding-top: 0;
    margin-top: -2px;
  }
`;

export const ArrowLefContainer = styled.div`
  cursor: pointer;
  padding-bottom: 10px;
  padding-left: 20px;
  position: absolute;

  @media screen and (${props => props.theme.breakpoints.tablet}){
    padding: 0px 20px;
    top: 12px;
    margin-left: -8px;
    > svg {
      width: 13.62px;
      height: 23.1px;
    }
  }
`;

export const ArrowLeft = styled(ArrowftSvg)`
  fill: ${props => props.theme.colors.purple};
`;
