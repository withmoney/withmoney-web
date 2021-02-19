import React from 'react';
import styled from 'styled-components';
import { Row, Cell } from 'Operation/style/OperationSettings';
import { TransactionType } from 'models';
import { useOperationsFilters } from 'hooks/useOperationsFilters';

type Props = {
  onClick: () => void;
};

const OperationPlaceholder = ({ onClick }: Props) => {
  const { currentTransactionType } = useOperationsFilters();
  return (
    <Row cursorHover onClick={onClick} alignItems="center">
      <Cell width="80px">
        <CheckBox disabled />
      </Cell>
      <Cell width="130px">
        <CellPlaceholder />
      </Cell>
      <Cell flex="1">
        <CellPlaceholder />
      </Cell>
      <Cell flex="1">
        <CellPlaceholder />
      </Cell>
      {currentTransactionType === TransactionType.CreditCard && (
        <Cell width="200px">
          <CellPlaceholder />
        </Cell>
      )}
      <Cell width="200px">
        <CellPlaceholder />
      </Cell>
      <Cell width="56px"></Cell>
    </Row>
  );
};

const CellPlaceholder = styled.div`
  display: flex;
  height: 40px;
  background: linear-gradient(0deg, #f4f4f4, #f4f4f4), linear-gradient(0deg, #f4f4f4, #f4f4f4),
    #f4f4f4;
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 23px;
  height: 23px;
  background: linear-gradient(0deg, #f4f4f4, #f4f4f4), linear-gradient(0deg, #f4f4f4, #f4f4f4),
    #f4f4f4;
`;

export default OperationPlaceholder;
