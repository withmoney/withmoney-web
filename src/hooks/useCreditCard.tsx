import { useApolloClient, useMutation } from '@apollo/client';
import { useAccountFilters } from './useAccountFilters';
import { FILTER_CARD, CREATE_CARD, ALL_CARDS } from '../graphql/CreditCard';

export const useFilterCards = () => {
  const client = useApolloClient();
  const { currentAccount } = useAccountFilters();

  async function filterCard(value: string) {
    const { data } = await client.query({
      query: FILTER_CARD,
      variables: { name: value, id: currentAccount?.id },
    });

    if (data?.cards.data) {
      return data.cards.data.map((card: any) => ({
        value: card.id,
        label: card.name,
      }));
    }

    return [];
  }

  return filterCard;
};

// create CreditCard
export function useCreateCategory() {
  const { currentAccount } = useAccountFilters();
  const [createCreditCard, { data, error, loading }] = useMutation(CREATE_CARD, {
    refetchQueries: [
      {
        query: ALL_CARDS,
        variables: { id: currentAccount?.id },
      },
    ],
  });
  return { createCreditCard, data, loading, error };
}
