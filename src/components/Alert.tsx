import React from 'react';
import { classNames } from 'utils/classNames';

interface Props {
  isDanger?: boolean;
  width?: string;
  children: React.ReactNode;
}

const Alert: React.FC<Props> = ({ isDanger, width, children }) => {
  return (
    <div
      className={classNames(
        'text-white p-[15px] mb-[20px] rounded-[4px] text-center',
        isDanger
          ? 'bg-[var(--alert-danger-background-color)]'
          : 'bg-[var(--alert-primary-background-color)]',
      )}
      style={{ width }}
    >
      {children}
    </div>
  );
};

export default Alert;
