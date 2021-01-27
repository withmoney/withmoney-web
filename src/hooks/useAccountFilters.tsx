import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ACCOUNTS } from '../graphql/Accounts';
import { Me, Account } from '../models';

type Data = {
  me: Me;
};

interface AccountFilterContext {
  currentAccountId?: string;
  setCurrentAccountId: (accountId: string) => void;
}

type Props = {
  children: React.ReactNode;
};

const AccountFilterContext = createContext<AccountFilterContext>({
  setCurrentAccountId: () => {},
});

export default function AccountFiltersProvider({ children }: Props) {
  const [currentAccountId, setCurrentAccountId] = useState<string | undefined>();

  const { data: accounts } = useQuery<Data>(GET_ACCOUNTS);

  useEffect(() => {
    if (!currentAccountId && accounts?.me?.accounts?.length) {
      setCurrentAccountId(accounts?.me?.accounts[0].id);
    }
  }, [currentAccountId, accounts]);

  return (
    <AccountFilterContext.Provider
      value={{
        currentAccountId,
        setCurrentAccountId,
      }}
    >
      {children}
    </AccountFilterContext.Provider>
  );
}

export function useAccountFilters() {
  const context = useContext(AccountFilterContext);
  const { currentAccountId, setCurrentAccountId } = context;
  return {
    currentAccountId,
    setCurrentAccountId,
  };
}
