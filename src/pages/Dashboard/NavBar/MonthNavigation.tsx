import React from 'react';
import { ArrowIosBack, ArrowIosForward } from '@styled-icons/evaicons-solid';
import ArrowButton from './ArrowButton';
import Text from '../../../components/Text';
import { DateContainer } from './style/MonthNavigation.style';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import { useOperations } from '../../../hooks/useOperations';

const MonthNavigation = () => {
  const { currentDateTime, goToNextMonth, goToPreviewMonth } = useOperationsFilters();
  const { loading } = useOperations();

  const month = currentDateTime?.monthLong;
  const year = currentDateTime?.year;
  return (
    <DateContainer>
      <ArrowButton isLoading={loading} onClick={goToPreviewMonth}>
        <ArrowIosBack />
      </ArrowButton>
      <ArrowButton isLoading={loading} onClick={goToNextMonth}>
        <ArrowIosForward />
      </ArrowButton>
      <Text>{`${month} ${year}`}</Text>
    </DateContainer>
  );
};

export default MonthNavigation;
