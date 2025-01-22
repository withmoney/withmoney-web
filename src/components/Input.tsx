import styled from 'styled-components';
import { classNames } from 'utils/classNames';

const InputStyled = styled.input<Props>`
  border: 1px solid
    ${({ isInvalid }) =>
      isInvalid ? `var(--input-border-color-danger)` : `var(--input-border-color)`};

  &:hover {
    border-color: var(--input-border-color-hover);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--input-box-shadow);
    border-color: var(--input-border-color-focus);
  }

  &:active {
    border-color: var(--input-border-color-active);
  }

  &:disabled {
    border-color: var(--input-border-color-disabled);
    background-color: var(--input-disabled-background-color);
  }
`;

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  isInvalid?: boolean;
};

const Input: React.FC<Props> = ({ isInvalid, className, ...props }) => {
  return (
    <InputStyled
      className={classNames('text-sm w-full h-[42px] outline-none p-2 rounded', className)}
      {...props}
      isInvalid={isInvalid}
    />
  );
};

export default Input;
