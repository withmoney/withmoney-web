import styled from 'styled-components';
import Button from './Button';
import { StyledIconBase } from '@styled-icons/styled-icon';

type Props = {
  isText?: boolean;
};

const ButtonIcon = styled(Button)<Props>`
  ${StyledIconBase} {
    color: ${({ variation = 'default' }) => `var(--button-${variation}-color)`};
    width: var(--font-default);
    margin-right: ${({ isText }) => (isText ? '10px' : '0')};
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ isText }) => (isText ? '12px 22px' : '12px 12px')};
`;

export default ButtonIcon;
