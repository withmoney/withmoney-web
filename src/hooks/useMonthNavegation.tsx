import React, { createContext, useState, useContext } from 'react';
import { DateTime } from 'luxon';

interface DateTimeContext {
  month?: number;
  year?: number;
  goToNextMonth?: () => void;
  goToPreviewMonth?: () => void;
  monthLong?: string;
}

const dateTime = createContext<DateTimeContext>({});

type Props = {
  children: React.ReactNode;
};

export default function DateTimeProvider({ children }: Props) {
  const today = DateTime.local();
  const [month, setMonth] = useState(today.get('month'));
  const [year, setYear] = useState(today.get('year'));
  const monthLong = DateTime.local(year, month).monthLong;

  const goToNextMonth = () => {
    if (month < 12 && month >= 1) {
      setMonth(month + 1);
    }
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    }
  };

  const goToPreviewMonth = () => {
    if (month > 1 && month <= 12) {
      setMonth(month - 1);
    }
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    }
  };

  return (
    <dateTime.Provider
      value={{
        month,
        year,
        goToNextMonth,
        goToPreviewMonth,
        monthLong,
      }}
    >
      {children}
    </dateTime.Provider>
  );
}

export function useDateTime() {
  const context = useContext(dateTime);
  const { monthLong, month, year, goToNextMonth, goToPreviewMonth } = context;
  return { monthLong, month, year, goToNextMonth, goToPreviewMonth };
}
