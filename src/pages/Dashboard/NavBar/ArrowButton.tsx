import React from 'react';
import { ArrowButtonContainer } from './Styles/ArrowButton styles';

type Props = {
  children?: React.ReactNode;
};

const ArrowButton = ({ children }: Props) => {
  return <ArrowButtonContainer>{children}</ArrowButtonContainer>;
};

export default ArrowButton;
