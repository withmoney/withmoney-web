import React from 'react';
import { ArrowButtonContainer } from './style/ArrowButton.style';

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
  isLoading: boolean;
};

const ArrowButton = ({ children, onClick, isLoading }: Props) => {
  return (
    <ArrowButtonContainer type="button" disabled={isLoading} onClick={onClick}>
      {children}
    </ArrowButtonContainer>
  );
};

export default ArrowButton;
