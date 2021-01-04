import React from 'react';
import { ArrowIosBack, ArrowIosForward } from '@styled-icons/evaicons-solid';
import ArrowButton from './ArrowButton';
import Text from '../../../components/Text';
import { DateContainer } from './styles/MonthNavigation.styles';

const MonthNavigation = () => {
  return (
    <DateContainer>
      <ArrowButton>
        <ArrowIosBack />
      </ArrowButton>
      <ArrowButton>
        <ArrowIosForward />
      </ArrowButton>
      <Text>December 2020</Text>
    </DateContainer>
  );
};

export default MonthNavigation;