import styled from 'styled-components';
import { StyledIconBase } from '@styled-icons/styled-icon';
import Button from 'components/Button';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col">{children}</div>;
};

// export const OperationContainer = styled.div`
//   display: flex;
//   margin-bottom: 15px;
//   flex-direction: column;
//   padding: 30px;
//   background-color: #ffff;
// `;

export const OperationContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full bg-white p-4">{children}</div>;
};

export const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

type Props = {
  color: 'Income' | 'Expense';
};

export const OperationButton = styled(Button)<Props>`
  border: none;
  background-color: ${({ color }) => color && `var(--dashboard-progress-bar-${color})`};
  &:hover {
    background-color: ${({ color }) => color && `var(--dashboard-progress-bar-${color}-hover)`};
  }

  &:disabled {
    background-color: ${({ color }) => color && `var(--dashboard-progress-bar-${color}-disabled)`};
  }

  &:active {
    background-color: ${({ color }) => color && `var(--dashboard-progress-bar-${color}-active)`};
  }

  &:focus {
    box-shadow: none;
    background-color: ${({ color }) => color && `var(--dashboard-progress-bar-${color})`};
  }

  svg {
    width: 100px;
  }

  ${StyledIconBase} {
    border: none;
    color: ${({ variation = 'default' }) => `var(--button-${variation}-color)`};
    font-size: 22px;
    width: 22px;
  }
`;
