/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { colors } from 'theme';
import { BlackText } from 'components/Texts';


export const MainContainer = styled.div`
  margin-bottom: 77px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 470px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const ImportantNote = styled.span<{ isBold?: boolean }>`
  font-family: "Source Sans Pro";
  font-size: 0.75rem;
  line-height: 1.42;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  display: block;
  max-width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin: 52px auto;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 470px;
    margin-left: auto;
    margin-right: auto;
  }

  /* 🔒 Hard-force RTL and isolate the paragraph from surrounding bidi context */
  &:dir(rtl),
  html[dir="rtl"] & {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: bidi-override !important; /* key: force RTL ordering across wrapped lines */
    white-space: normal !important;
    word-break: normal !important;
    letter-spacing: 0 !important;
  }

  /* keep inline bold safe */
  &:dir(rtl) strong,
  html[dir="rtl"] & strong {
    unicode-bidi: isolate;
    direction: rtl;
  }
`;

export const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.mineShaft};
  font-size: 18px;
  font-family: "Source Sans Pro";
  margin-left: 20px;
  margin-top: 35px;
  text-align: left;
  white-space: pre-wrap;
  width: 100%;
  
  @media screen and (${props => props.theme.breakpoints.tablet}) {
    align-text: center; 
    max-width: 592px;
    margin: 30px auto;
  }
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 20px 0px 20px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 592px;
    margin: 0 auto;
  }
`;

export const PlayerContainerTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const PlayerPlayContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 76px;
`;

export const PlayerPlayButton = styled.div`
  width: 108px;
  height: 108px;
  background-color: ${colors.purple_10};
  border-radius: 50%;
  cursor: pointer;
  display: flex; 
  align-items: center; 
  justify-content: center; 
`;

export const PlayerPlay = styled.img`
  width: 33px;
  height: 40px;
`;

export const PlayerCrossContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 22px;
  padding-bottom: 22px;
  margin-right: -20px;
  padding-right: 20px;
  box-sizing: content-box;
  cursor: pointer;
`;

export const PlayerCross = styled.img`
  width: 14px;
  height: 14px;
`;

export const PlayerTopMiddle = styled.div`
  flex: 1;
`;

export const PlayerFileName = styled(BlackText).attrs({ dark: true, fontSize: '1rem' })`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: left;
  font-size: 14px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
    line-height: 24px;
  }
`;

export const PlayerFileSize = styled(BlackText).attrs({ dark: true, fontSize: '0.625rem' })`
  text-align: left;
  color: ${props => props.theme.colors.darkGray};

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    font-size: 0.875rem;
    line-height: 24px;
  }
`;

export const PlayerContainerBottom = styled.div``;

export const PlayerBottomTop = styled.div`
  position: relative;
  margin-bottom: 4px;
`;

export const PlayerBottomTrack = styled.div<{ progress?: number; playing?: boolean }>`
  position: relative;
  width: 100%;
  height: 4px;
  background-color: ${colors.purple_10};

  &:after{
    content: '';
    position: absolute; 
    left: 0;
    height: 4px;
    background-color: ${colors.purple};
    width: ${props => (props.progress ? `${props.progress}%` : '0%')};
    ${props => (props.playing ? 'transition: width 0.2s linear;' : '')}

  }
`;

export const PlayerBottomThumb = styled.div<{ progress?: number; playing?: boolean }>`
  position: absolute;
  top: -6px;
  left: ${props => (props.progress ? `${props.progress}%` : '0px')};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${colors.purple};
  transform: translateX(-50%);
  ${props => (props.playing ? 'transition: left 0.2s linear;' : '')}
`;

export const PlayerBottomBottom = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const PlayerTimeIndicator = styled(BlackText).attrs({ dark: true, fontSize: '14px' })`
  opacity: 0.5;
  margin-top: 8px;
`;
