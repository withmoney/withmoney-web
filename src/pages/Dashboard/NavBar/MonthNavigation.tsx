import React, { useEffect, useState } from 'react';
import { ArrowIosBack, ArrowIosForward } from '@styled-icons/evaicons-solid';
import ArrowButton from './ArrowButton';
import capitalize from 'lodash/capitalize';
import Text from 'components/Text';
import { DateContainer, MonthContent } from './style/MonthNavigation.style';
import { useOperationsFilters } from 'hooks/useOperationsFilters';
import { useOperations } from 'hooks/useOperations';
import { useUserLanguage } from 'hooks/useUser';

const MonthNavigation = () => {
  const { currentDateTime, setCurrentDateTime } = useOperationsFilters();
  const { loading } = useOperations();
  const { value: language } = useUserLanguage();
  const [locale, changeLocale] = useState<string>('en-US');
  const month = currentDateTime?.setLocale(locale).monthLong;
  const year = currentDateTime?.setLocale(locale).year;

  useEffect(() => {
    if (language) {
      changeLocale(language);
    }
  }, [language]);

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
      <MonthContent>
        <Text bold>{`${capitalize(month)} ${year}`}</Text>
      </MonthContent>
      <ArrowButton isLoading={loading} onClick={goToNextMonth}>
        <ArrowIosForward />
      </ArrowButton>
    </DateContainer>
  );
};

export default MonthNavigation;
