import React, { createContext, useState, useContext } from 'react';
import { DateTime } from 'luxon';

interface DateTimeContext {
  currentDateTime?: DateTime;
  goToNextMonth?: () => void;
  goToPreviewMonth?: () => void;
}

type Props = {
  children: React.ReactNode;
};

const DateTimeContext = createContext<DateTimeContext>({});

export default function DateTimeProvider({ children }: Props) {
  const [currentDateTime, setCurrentDateTime] = useState(DateTime.local());

  const goToNextMonth = () => {
    setCurrentDateTime(currentDateTime.plus({ month: 1 }));
  };

  const goToPreviewMonth = () => {
    setCurrentDateTime(currentDateTime.plus({ month: -1 }));
  };

  return (
    <DateTimeContext.Provider value={{ currentDateTime, goToNextMonth, goToPreviewMonth }}>
      {children}
    </DateTimeContext.Provider>
  );
}

export function useMonthNavigation() {
  const context = useContext(DateTimeContext);
  const { currentDateTime, goToNextMonth, goToPreviewMonth } = context;
  return { currentDateTime, goToNextMonth, goToPreviewMonth };
}
