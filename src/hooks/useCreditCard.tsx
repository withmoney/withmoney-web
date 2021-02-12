import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useAccountFilters } from './useAccountFilters';
import { FILTER_CREDIT_CARD, CREATE_CREDIT_CARD } from '../graphql/CreditCard';
import { CREDIT_CARDS, DELETE_CREDIT_CARD, RESTORE_CREDIT_CARD } from '../graphql/CreditCard';
import { DataCreditCards } from '../models';

type Data = {
  creditCards: DataCreditCards;
};

export const useCreditCards = (options?: any) => {
  return useQuery(FILTER_CREDIT_CARD, options);
};

export const useFilterCreditCards = () => {
  const client = useApolloClient();
  const { currentAccount } = useAccountFilters();

  async function filterCard(value: string) {
    const { data } = await client.query<Data>({
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
