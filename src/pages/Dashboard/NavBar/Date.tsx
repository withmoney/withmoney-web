import React from 'react';
import styled from 'styled-components';
import { ArrowIosBack, ArrowIosForward } from '@styled-icons/evaicons-solid';
import ArrowButton from './ArrowButton';
import Text from '../../../components/Text';

const Date = () => {
  return (
    <DateContainer>
      <ArrowButton>
        <ArrowIosBack />
      </ArrowButton>
      <ArrowButton>
        <ArrowIosForward />
      </ArrowButton>
      <Text bold>December 2020</Text>
    </DateContainer>
  );
};

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 22px;
`;

export default Date;
