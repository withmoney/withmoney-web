import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useAccountFilters } from './useAccountFilters';
import { FILTER_CREDIT_CARD, CREATE_CREDIT_CARD, GET_ONE_CREDIT_CARD } from '../graphql/CreditCard';
import {
  CREDIT_CARDS,
  DELETE_CREDIT_CARD,
  RESTORE_CREDIT_CARD,
  UPDATE_CREDIT_CARD,
} from '../graphql/CreditCard';
import { CreditCards } from '../models';

export const useCreditCards = (options?: any) => {
  return useQuery<CreditCards>(FILTER_CREDIT_CARD, options);
};

export const useFilterCreditCards = () => {
  const client = useApolloClient();
  const { currentAccount } = useAccountFilters();

  async function filterCard(value: string) {
    const { data } = await client.query<CreditCards>({
      query: FILTER_CREDIT_CARD,
      variables: { name: value, id: currentAccount?.id },
    });

    if (data?.creditCards.data) {
      return data.creditCards.data.map((creditCard) => ({
        value: creditCard.id,
        label: creditCard.name,
      }));
    }

    return [];
  }

  return filterCard;
};

// create CreditCard
export function useCreateCreditCard() {
  const { currentAccount } = useAccountFilters();
  const [createCreditCard, { data, error, loading }] = useMutation(CREATE_CREDIT_CARD, {
    refetchQueries: [
      {
        query: CREDIT_CARDS,
        variables: { id: currentAccount?.id },
      },
    ],
  });
  return { createCreditCard, data, loading, error };
}

//delete CreditCard
export function useDeleteCreditCard() {
  const [deleteCreditCard, { data, error, loading }] = useMutation(DELETE_CREDIT_CARD, {
    refetchQueries: [{ query: FILTER_CREDIT_CARD }],
  });
  return { deleteCreditCard, data, loading, error };
}

// restore CreditCard

export function useRestoreCreditCard() {
  const [restoreCreditCard, { data, error, loading }] = useMutation(RESTORE_CREDIT_CARD, {
    refetchQueries: [{ query: FILTER_CREDIT_CARD }],
  });
  return { restoreCreditCard, data, loading, error };
}

// get one Credit Card

export function useUniqueCreditCard(id: string) {
  return useQuery(GET_ONE_CREDIT_CARD, { variables: { id } });
}

// update Credit Card
export const useUpdateCreditCard = () => {
  const [updateCreditCard, { data, loading, error }] = useMutation(UPDATE_CREDIT_CARD, {
    refetchQueries: [{ query: FILTER_CREDIT_CARD }],
  });

  return { updateCreditCard, data, loading, error };
};
