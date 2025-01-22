import React from 'react';
import Button from './Button';
import { classNames } from 'utils/classNames';

type ButtonIconProps = React.ComponentProps<typeof Button>;

const ButtonIcon: React.FC<ButtonIconProps> = ({ className, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        // 'p-[var(--button-padding-vertical)] px-[var(--button-padding-horizontal)]',
        'px-3 py-2.5 inline-flex items-center justify-center rounded text-[var(--button-danger-color)] bg-[var(--button-danger-background-color)] cursor-pointer text-base',
        className,
      )}
    />
  );
};

export default ButtonIcon;
