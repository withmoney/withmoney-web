import React, { createContext, useState, useContext, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useQuery } from '@apollo/react-hooks';
import { GET_ACCOUNTS } from '../graphql/Accounts';
import { Me, TransactionType, Account } from '../models';

type Data = {
  me: Me;
};

interface OperationsFiltersContext {
  accountToUpdate?: Account;
  currentDateTime?: DateTime;
  currentAccountId?: string;
  currentTransactionType?: TransactionType;
  goToNextMonth?: () => void;
  goToPreviewMonth?: () => void;
  setCurrentAccountId: (accountId: string) => void;
  setCurrentTransactionType: (TransactionType: TransactionType) => void;
  setAccountToUpdate: (id: Account) => void;
}

type Props = {
  children: React.ReactNode;
};

const OperationsFiltersContext = createContext<OperationsFiltersContext>({
  setCurrentAccountId: () => {},
  setCurrentTransactionType: () => {},
  setAccountToUpdate: () => {},
});

export default function OperationsFiltersProvider({ children }: Props) {
  const [currentDateTime, setCurrentDateTime] = useState(DateTime.local());
  const [currentAccountId, setCurrentAccountId] = useState<string | undefined>();
  const [accountToUpdate, setAccountToUpdate] = useState<Account | undefined>();
  const [currentTransactionType, setCurrentTransactionType] = useState<TransactionType>(
    TransactionType.Deposit,
  );
  const { data: accounts } = useQuery<Data>(GET_ACCOUNTS);

  useEffect(() => {
    if (!currentAccountId && accounts?.me?.accounts?.length) {
      setCurrentAccountId(accounts?.me?.accounts[0].id);
    }
  }, [currentAccountId, accounts]);

  const goToNextMonth = () => {
    setCurrentDateTime(currentDateTime.plus({ month: 1 }));
  };

  const goToPreviewMonth = () => {
    setCurrentDateTime(currentDateTime.plus({ month: -1 }));
  };

  return (
    <OperationsFiltersContext.Provider
      value={{
        accountToUpdate,
        currentDateTime,
        currentAccountId,
        currentTransactionType,
        goToNextMonth,
        goToPreviewMonth,
        setCurrentAccountId,
        setCurrentTransactionType,
        setAccountToUpdate,
      }}
    >
      {children}
    </OperationsFiltersContext.Provider>
  );
}

export function useOperationsFilters() {
  const context = useContext(OperationsFiltersContext);
  const {
    accountToUpdate,
    currentDateTime,
    currentAccountId,
    currentTransactionType,
    goToNextMonth,
    goToPreviewMonth,
    setCurrentAccountId,
    setCurrentTransactionType,
    setAccountToUpdate,
  } = context;
  return {
    accountToUpdate,
    currentDateTime,
    currentAccountId,
    currentTransactionType,
    goToNextMonth,
    goToPreviewMonth,
    setCurrentAccountId,
    setCurrentTransactionType,
    setAccountToUpdate,
  };
}
