import styled from 'styled-components';

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    height: 100%;
    max-width: 400px;
    margin: auto;
`;

export const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 17px;
`;

export const ModalContent = styled.div`
  font-size: 14px;
  margin-bottom: 17px;
`;
