import React from 'react';
import { ArrowIosBack, ArrowIosForward } from '@styled-icons/evaicons-solid';
import ArrowButton from './ArrowButton';
import Text from '../../../components/Text';
import { DateContainer } from './style/MonthNavigation.style';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import { useOperations } from '../../../hooks/useOperations';

const MonthNavigation = () => {
  const { currentDateTime, setCurrentDateTime } = useOperationsFilters();
  const { loading } = useOperations();

  const month = currentDateTime?.monthLong;
  const year = currentDateTime?.year;

  const goToNextMonth = () => {
    if (currentDateTime) {
      setCurrentDateTime(currentDateTime.plus({ month: 1 }));
    }
  };

  const goToPreviewMonth = () => {
    if (currentDateTime) {
      setCurrentDateTime(currentDateTime.plus({ month: -1 }));
    }
  };

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
