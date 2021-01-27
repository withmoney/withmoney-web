import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ACCOUNTS, DELETE_ACCOUNT, RESTORE_ACCOUNT } from '../graphql/Accounts';
import { CREATE_ACCOUNT, UPDATE_ACCOUNT } from '../graphql/Accounts';
import { Data } from '../models';

//get
export function useAccounts() {
  return useQuery<Data>(GET_ACCOUNTS);
}
//create
export const useCreateAccount = () => {
  const [createAccount, { data, loading }] = useMutation(CREATE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  return { createAccount, data, loading };
};
//update
export const useUpdateAccount = () => {
  const [updateAccount, { data, loading, error }] = useMutation(UPDATE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  return { updateAccount, data, loading, error };
};
//delete
export const useDeleteAccount = () => {
  const [deleteAccount, { data, loading }] = useMutation(DELETE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  return { deleteAccount, data, loading };
};
//restore
export const useRestoreAccount = () => {
  const [restoreAccount, { data, loading }] = useMutation(RESTORE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  return { restoreAccount, data, loading };
};
