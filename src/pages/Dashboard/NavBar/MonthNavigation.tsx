import React from 'react';
import { ArrowIosBack, ArrowIosForward } from '@styled-icons/evaicons-solid';
import ArrowButton from './ArrowButton';
import Text from '../../../components/Text';
import { DateContainer } from './styles/MonthNavigation.styles';
import { useDateTime } from '../../../hooks/useMonthNavegation';

const MonthNavigation = () => {
  const { monthLong, year, goToNextMonth, goToPreviewMonth } = useDateTime();
  return (
    <DateContainer>
      <ArrowButton onClick={goToPreviewMonth}>
        <ArrowIosBack />
      </ArrowButton>
      <ArrowButton onClick={goToNextMonth}>
        <ArrowIosForward />
      </ArrowButton>
      <Text style={{ textTransform: 'capitalize' }}>{`${monthLong} ${year}`}</Text>
    </DateContainer>
  );
};

export default MonthNavigation;
