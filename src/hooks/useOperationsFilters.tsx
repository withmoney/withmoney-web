import React, { createContext, useState, useContext, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useQuery } from '@apollo/react-hooks';
import { GET_ACCOUNTS, ALL_CATEGORY } from '../graphql/AuthGql';
import { Me, TransactionType } from '../models';

type Data = {
  me: Me;
};

interface OperationsFiltersContext {
  currentDateTime?: DateTime;
  currentAccountId?: string;
  allCategories?: {}[];
  currentTransactionType?: TransactionType;
  goToNextMonth?: () => void;
  goToPreviewMonth?: () => void;
  setCurrentAccountId: (accountId: string) => void;
  setCurrentTransactionType: (TransactionType: TransactionType) => void;
  setAllCategories: (categories: {}[]) => void;
}

type Props = {
  children: React.ReactNode;
};

const OperationsFiltersContext = createContext<OperationsFiltersContext>({
  setCurrentAccountId: () => {},
  setCurrentTransactionType: () => {},
  setAllCategories: () => {},
});

export default function OperationsFiltersProvider({ children }: Props) {
  const [currentDateTime, setCurrentDateTime] = useState(DateTime.local());
  const [currentAccountId, setCurrentAccountId] = useState<string | undefined>();
  const [allCategories, setAllCategories] = useState<{}[]>();
  const [currentTransactionType, setCurrentTransactionType] = useState<TransactionType>(
    TransactionType.Deposit,
  );
  const { data: accounts } = useQuery<Data>(GET_ACCOUNTS);
  const { data: categories } = useQuery<Data>(ALL_CATEGORY);

  useEffect(() => {
    if (!currentAccountId && accounts?.me?.accounts?.length) {
      setCurrentAccountId(accounts?.me?.accounts[0].id);
    }

    if (!allCategories && categories?.me?.categories?.length) {
      const getAllCategories = categories.me.categories.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setAllCategories(getAllCategories);
    }
  }, [currentAccountId, accounts, categories]);

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
        allCategories,
        goToNextMonth,
        goToPreviewMonth,
        setCurrentAccountId,
        setCurrentTransactionType,
        setAllCategories,
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
    allCategories,
    goToNextMonth,
    goToPreviewMonth,
    setCurrentAccountId,
    setCurrentTransactionType,
    setAllCategories,
  } = context;
  return {
    currentDateTime,
    currentAccountId,
    currentTransactionType,
    allCategories,
    goToNextMonth,
    goToPreviewMonth,
    setCurrentAccountId,
    setCurrentTransactionType,
    setAllCategories,
  };
}
