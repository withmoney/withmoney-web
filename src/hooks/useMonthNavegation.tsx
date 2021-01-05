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

const dateTime = createContext<DateTimeContext>({});

export default function DateTimeProvider({ children }: Props) {
  const [currentDateTime, setCurrentDateTime] = useState(DateTime.local());

  const goToNextMonth = () => {
    setCurrentDateTime(currentDateTime.plus({ month: 1 }));
  };

  const goToPreviewMonth = () => {
    setCurrentDateTime(currentDateTime.plus({ month: -1 }));
  };

  return (
    <dateTime.Provider value={{ currentDateTime, goToNextMonth, goToPreviewMonth }}>
      {children}
    </dateTime.Provider>
  );
}

export function useDateTime() {
  const context = useContext(dateTime);
  const { currentDateTime, goToNextMonth, goToPreviewMonth } = context;
  return { currentDateTime, goToNextMonth, goToPreviewMonth };
}
