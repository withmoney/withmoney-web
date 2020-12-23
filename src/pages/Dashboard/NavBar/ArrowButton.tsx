import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
};

const ArrowButton = ({ children }: Props) => {
  return <ArrowButtonContainer>{children}</ArrowButtonContainer>;
};

const ArrowButtonContainer = styled.button`
  background-color: #e7e7e7;
  width: 34px;
  height: 34px;
  margin-right: 10px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  outline: none;

  &:hover {
    background-color: #dddcdc;
  }
`;

export default ArrowButton;
