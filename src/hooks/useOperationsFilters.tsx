import React, { createContext, useState, useContext, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useQuery } from '@apollo/react-hooks';
import { GET_ACCOUNTS } from '../graphql/AuthGql';
import { Me, TransactionType } from '../models';

type Data = {
  me: Me;
};

interface OperationsFiltersContext {
  currentDateTime?: DateTime;
  currentAccountId?: string;
  currentTransactionType?: TransactionType;
  goToNextMonth?: () => void;
  goToPreviewMonth?: () => void;
  setCurrentAccountId: (accountId: string) => void;
  setCurrentTransactionType: (TransactionType: TransactionType) => void;
}

type Props = {
  children: React.ReactNode;
};

const OperationsFiltersContext = createContext<OperationsFiltersContext>({
  setCurrentAccountId: () => {},
  setCurrentTransactionType: () => {},
});

export default function OperationsFiltersProvider({ children }: Props) {
  const [currentDateTime, setCurrentDateTime] = useState(DateTime.local());
  const [currentAccountId, setCurrentAccountId] = useState<string | undefined>();
  const [currentTransactionType, setCurrentTransactionType] = useState<TransactionType>(
    TransactionType.Deposit,
  );

  const { data } = useQuery<Data>(GET_ACCOUNTS);

  useEffect(() => {
    if (!currentAccountId && data?.me?.accounts?.length) {
      setCurrentAccountId(data?.me?.accounts[0].id);
    }
  }, [currentAccountId, data]);

  const goToNextMonth = () => {
    setCurrentDateTime(currentDateTime.plus({ month: 1 }));
  };

  const goToPreviewMonth = () => {
    setCurrentDateTime(currentDateTime.plus({ month: -1 }));
  };

  return (
    <OperationsFiltersContext.Provider
      value={{
        currentDateTime,
        currentAccountId,
        currentTransactionType,
        goToNextMonth,
        goToPreviewMonth,
        setCurrentAccountId,
        setCurrentTransactionType,
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
    currentAccountId,
    currentTransactionType,
    goToNextMonth,
    goToPreviewMonth,
    setCurrentAccountId,
    setCurrentTransactionType,
  } = context;
  return {
    currentDateTime,
    currentAccountId,
    currentTransactionType,
    goToNextMonth,
    goToPreviewMonth,
    setCurrentAccountId,
    setCurrentTransactionType,
  };
}
