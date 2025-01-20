import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGetAccountsQuery } from 'graphql-service/hooks';
import { Account } from 'models';

interface AccountFilterContext {
  currentAccount?: Account;
  setCurrentAccount: (account: Account) => void;
}

type Props = {
  children: React.ReactNode;
};

const AccountFilterContext = createContext<AccountFilterContext>({
  setCurrentAccount: () => {},
});

export default function AccountFiltersProvider({ children }: Props) {
  const [currentAccount, setCurrentAccount] = useState<Account | undefined>();
  const { data } = useGetAccountsQuery();

  useEffect(() => {
    if (!currentAccount && data?.accounts?.length) {
      const currentAccountLS = localStorage.getItem('currentAccount');
      const account = data.accounts.find((account) => account.id === currentAccountLS);
      if (account) {
        setCurrentAccount(account);
      } else {
        setCurrentAccount(data?.accounts[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <AccountFilterContext.Provider
      value={{
        currentAccount,
        setCurrentAccount,
      }}
    >
      {children}
    </AccountFilterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAccountFilters() {
  const context = useContext(AccountFilterContext);
  const { currentAccount, setCurrentAccount } = context;
  return {
    currentAccount,
    setCurrentAccount,
  };
}
