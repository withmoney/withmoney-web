import { useQuery } from '@apollo/react-hooks';
import { useDateTime } from './useMonthNavigation';
import { GET_OPERATIONS } from '../graphql/AuthGql';

export function useOperations() {
  const { currentDateTime } = useDateTime();

  return useQuery(GET_OPERATIONS, {
    variables: {
      initDate: currentDateTime?.startOf('month'),
      endDate: currentDateTime?.endOf('month'),
    },
  });
}
