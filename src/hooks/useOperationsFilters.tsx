import React, { createContext, useState, useContext } from 'react';
import { DateTime } from 'luxon';
import { TransactionType } from 'models';

interface OperationsFiltersContext {
  currentDateTime?: DateTime;
  currentTransactionType?: TransactionType;
  categoryId: string | null;
  goToNextMonth?: () => void;
  goToPreviewMonth?: () => void;
  setCurrentTransactionType: (TransactionType: TransactionType) => void;
  setCurrentDateTime: (value: DateTime) => void;
  setCategoryId: (categoryId: string | null) => void;
}

type Props = {
  children: React.ReactNode;
};

const OperationsFiltersContext = createContext<OperationsFiltersContext>({
  categoryId: null,
  setCurrentTransactionType: () => {},
  setCurrentDateTime: () => {},
  setCategoryId: () => {},
});

export default function OperationsFiltersProvider({ children }: Props) {
  const [currentDateTime, setCurrentDateTime] = useState<DateTime>(DateTime.local());
  const [currentTransactionType, setCurrentTransactionType] = useState<TransactionType>(
    TransactionType.Deposit,
  );
  const [categoryId, setCategoryId] = useState<string | null>(null);

  return (
    <OperationsFiltersContext.Provider
      value={{
        currentDateTime,
        currentTransactionType,
        setCurrentTransactionType,
        setCurrentDateTime,
        categoryId,
        setCategoryId,
      }}
    >
      {children}
    </OperationsFiltersContext.Provider>
  );
}

export function useOperationsFilters() {
  return useContext(OperationsFiltersContext);
}
