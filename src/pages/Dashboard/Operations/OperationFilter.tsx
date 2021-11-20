import React from 'react';
import styled from 'styled-components';
import CategorySearch from 'components/CategorySearch/CategorySearch';
import {
  RowHeader,
  CellHeader,
} from 'pages/Dashboard/Operations/Operation/style/OperationSettings';

import { TransactionType } from 'models';

type Props = {
  type: TransactionType;
  onChange: (categoryId: string | null) => void;
};

const OperationFilter = ({ type, onChange }: Props) => {
  return (
    <Box>
      <RowHeader>
        <CellHeader width="80px"></CellHeader>
        <CellHeader width="130px"></CellHeader>
        <CellHeader flex="1"></CellHeader>
        <CellHeader flex="1">
          <CategorySearch type={type} onChange={onChange} />
        </CellHeader>
        {type === TransactionType.CreditCard && <CellHeader width="200px"></CellHeader>}
        <CellHeader width="200px"></CellHeader>
        <CellHeader width="56px"></CellHeader>
      </RowHeader>
    </Box>
  );
};

const Box = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--button-default-border);
  padding-bottom: 0.5rem;
`;

export default OperationFilter;
