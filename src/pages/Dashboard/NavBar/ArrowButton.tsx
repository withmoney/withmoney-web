import React from 'react';
import { ArrowButtonContainer } from './style/ArrowButton.style';

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
};

const ArrowButton = ({ children, onClick }: Props) => {
  return <ArrowButtonContainer onClick={onClick}>{children}</ArrowButtonContainer>;
};

export default ArrowButton;
