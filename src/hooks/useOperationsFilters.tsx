import React, { createContext, useState, useContext } from 'react';
import { DateTime } from 'luxon';
import { TransactionType } from '../models';

interface OperationsFiltersContext {
  currentDateTime?: DateTime;
  currentTransactionType?: TransactionType;
  goToNextMonth?: () => void;
  goToPreviewMonth?: () => void;
  setCurrentTransactionType: (TransactionType: TransactionType) => void;
  setCurrentDateTime: (value: DateTime) => void;
}

type Props = {
  children: React.ReactNode;
};

const OperationsFiltersContext = createContext<OperationsFiltersContext>({
  setCurrentTransactionType: () => {},
  setCurrentDateTime: () => {},
});

export default function OperationsFiltersProvider({ children }: Props) {
  const [currentDateTime, setCurrentDateTime] = useState<DateTime>(DateTime.local());
  const [currentTransactionType, setCurrentTransactionType] = useState<TransactionType>(
    TransactionType.Deposit,
  );

  return (
    <OperationsFiltersContext.Provider
      value={{
        currentDateTime,
        currentTransactionType,
        setCurrentTransactionType,
        setCurrentDateTime,
      }}
    >
      {children}
    </OperationsFiltersContext.Provider>
  );
}

export function useOperationsFilters() {
  const context = useContext(OperationsFiltersContext);
  const {
    currentDateTime,
    currentTransactionType,
    setCurrentTransactionType,
    setCurrentDateTime,
  } = context;
  return {
    currentDateTime,
    currentTransactionType,
    setCurrentTransactionType,
    setCurrentDateTime,
  };
}
