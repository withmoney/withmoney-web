import styled from 'styled-components';

type ProgressProps = {
  variation?: string;
  percent: string;
};

export const InfoContainer = styled.div`
  padding: 10px 0;
  margin: 5px 0;
`;

export const ProgressBar = styled.div`
  display: flex;
  background-color: var(--dashboard-empty-progress-bar);
`;

export const Progress = styled.div<ProgressProps>`
  width: ${({ percent }) => percent};
  padding: 5px 0;
  background-color: ${({ variation }) => `var(--dashboard-progress-bar-${variation})`};
`;

export const ProgressCreditCard = styled.div<ProgressProps>`
  width: ${({ percent }) => percent};
  padding: 5px 0;
  background-color: ${({ variation }) => variation};
`;

export const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
