import React from 'react';
import { ArrowButtonContainer } from './styles/ArrowButton.styles';

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
};

const ArrowButton = ({ children, onClick }: Props) => {
  return <ArrowButtonContainer onClick={onClick}>{children}</ArrowButtonContainer>;
};

export default ArrowButton;
