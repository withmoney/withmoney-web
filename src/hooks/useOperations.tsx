import { useQuery } from '@apollo/react-hooks';
import { useDateTime } from './useMonthNavigation';
import { GET_OPERATIONS } from '../graphql/AuthGql';
import { Me } from '../models';

type Data = {
  me: Me;
};

export function useOperations() {
  const { currentDateTime } = useDateTime();

  return useQuery<Data>(GET_OPERATIONS, {
    variables: {
      initDate: currentDateTime?.startOf('month'),
      endDate: currentDateTime?.endOf('month'),
    },
  });
}
