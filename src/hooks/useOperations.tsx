import { useQuery } from '@apollo/react-hooks';
import { useMonthNavigation } from './useMonthNavigation';
import { GET_OPERATIONS } from '../graphql/AuthGql';
import { Me } from '../models';

type Data = {
  me: Me;
};

export function useOperations() {
  const { currentDateTime } = useMonthNavigation();

  return useQuery<Data>(GET_OPERATIONS, {
    variables: {
      startDateTime: currentDateTime?.startOf('month'),
      endDateTime: currentDateTime?.endOf('month'),
    },
  });
}
