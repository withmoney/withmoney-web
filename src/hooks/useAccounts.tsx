import { useEffect } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import NProgress from 'nprogress';
import { GET_ACCOUNTS, DELETE_ACCOUNT } from '../graphql/Accounts';
import { RESTORE_ACCOUNT, GET_ONE_ACCOUNT } from '../graphql/Accounts';
import { CREATE_ACCOUNT, UPDATE_ACCOUNT } from '../graphql/Accounts';
import { Data } from '../models';

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

//getAll
export function useAccounts() {
  return useQuery<Data>(GET_ACCOUNTS);
}

//getOneAccount
export function useUniqueAccounts() {
  const [getUniqueAccount, { data, loading, error }] = useLazyQuery(GET_ONE_ACCOUNT);
  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);
  return { getUniqueAccount, data, loading, error };
}
//create
export const useCreateAccount = () => {
  const [createAccount, { data, loading, error }] = useMutation(CREATE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return { createAccount, data, loading, error };
};
//update
export const useUpdateAccount = () => {
  const [updateAccount, { data, loading, error }] = useMutation(UPDATE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return { updateAccount, data, loading, error };
};
//delete
export const useDeleteAccount = () => {
  const [deleteAccount, { data, loading, error }] = useMutation(DELETE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return { deleteAccount, data, loading, error };
};
//restore
export const useRestoreAccount = () => {
  const [restoreAccount, { data, loading, error }] = useMutation(RESTORE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return { restoreAccount, data, loading, error };
};
