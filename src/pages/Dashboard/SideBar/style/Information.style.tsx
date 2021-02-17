import styled from 'styled-components';
import { ArrowIosUpward } from '@styled-icons/evaicons-solid';
import { ArrowIosDownward } from '@styled-icons/evaicons-solid';

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--dashboard-color-white);
  padding: 0 20px;
  padding-top: 10px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--dashboard-border-color);
`;

export const ContainerText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;

export const DownArrow = styled(ArrowIosDownward)`
  width: 18px;
  color: var(--text-default-color);

  &:hover {
    color: var(--text-default-color-hover);
  }
`;

export const UpArrow = styled(ArrowIosUpward)`
  width: 18px;
  color: var(--text-default-color);

  &:hover {
    color: var(--text-default-color-hover);
  }
`;

export const ButtonCards = styled.span`
  padding: 5px;
  cursor: pointer;
`;
