import styled from 'styled-components';
import ButtonLink from 'components/ButtonLink';
import { PageBodyColumns } from 'pages/Dashboard/style/SubPages.style';
import Text from 'components/Text';
import Radio from 'components/Radio';

export const ReportButton = styled(ButtonLink)`
  border-radius: 0;
  outline: none;
  border: none;
  &:focus {
    border: none;
    box-shadow: none;
  }
`;

export const Table = styled(PageBodyColumns)`
  float: right;
  width: 48%;
  border: 2px solid #f2f2f2;
  padding: 0;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  ${Text} {
    padding: 8px;
  }

  ${Radio} {
    padding: 8px;
  }
`;
