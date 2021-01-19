import styled from 'styled-components';

export const SocialIconsContainer = styled.div`
  display: flex;  
  width: 220px;
  justify-content: space-between;
  margin: 44px auto 20px;
  
  @media (${props => props.theme.breakpoints.tablet}) {
    padding-left: 4px;
    width: 250px;
    margin: 64px auto 20px;
  }
`;

export const StyledImg = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
`;
