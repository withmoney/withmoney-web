import React from 'react';
import { ArrowButtonContainer } from './style/ArrowButton.style';

type Props = {
  children?: React.ReactNode;
};

const ArrowButton = ({ children }: Props) => {
  return <ArrowButtonContainer>{children}</ArrowButtonContainer>;
};

export default ArrowButton;
