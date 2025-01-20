import React from 'react';
import Button from './Button';
import { classNames } from 'utils/classNames';

type ButtonIconProps = React.ComponentProps<typeof Button>;

const ButtonIcon: React.FC<ButtonIconProps> = ({ className, ...props }) => {
  return (
    <Button
      {...props}
      className={classNames(
        'p-[var(--button-padding-vertical)] px-[var(--button-padding-horizontal)]',
        className,
      )}
    />
  );
};

export default ButtonIcon;
