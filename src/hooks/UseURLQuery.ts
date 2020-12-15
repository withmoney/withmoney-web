import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export const useUrlQuery = () => {
  return queryString.parse(useLocation().search);
};
