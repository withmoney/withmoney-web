import React from 'react';
import styled from 'styled-components';
import Flex from 'components/Flex';
import LoadingData from 'components/LoadingData';
import { TransactionType } from 'models';
import { useOperationsFilters } from 'hooks/useOperationsFilters';

type Props = {
  isLoading: boolean;
  rows?: number;
};

const DataPlaceholder = ({ isLoading, rows = 2 }: Props): any => {
  const Rows = Array.from({ length: rows });
  const { currentTransactionType } = useOperationsFilters();
  if (!!isLoading) {
    return Rows.map((_, rowIndex) => (
      <Row key={rowIndex} alignItems="center">
        <Cell width="80px">
          <CheckBox disabled />
        </Cell>
        <Cell width="130px">
          <LoadingData />
        </Cell>
        <Cell flex="1">
          <LoadingData />
        </Cell>
        <Cell flex="1">
          <LoadingData />
        </Cell>
        {currentTransactionType === TransactionType.CreditCard && (
          <Cell width="200px">
            <LoadingData />
          </Cell>
        )}
        <Cell width="200px">
          <LoadingData />
        </Cell>
        <Cell width="56px"></Cell>
      </Row>
    ));
  }
  return null;
};

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 23px;
  height: 23px;
  background: linear-gradient(0deg, #f4f4f4, #f4f4f4), linear-gradient(0deg, #f4f4f4, #f4f4f4),
    #f4f4f4;
`;

const Row = styled(Flex)`
  & + & {
    margin-top: 5px;
  }
`;

type PropsCell = {
  width?: string;
  flex?: string;
};

const Cell = styled(Flex)<PropsCell>`
  width: ${({ width }) => (width ? width : null)};
  flex: ${({ flex }) => (flex ? flex : null)};
  padding-left: 5px;
  padding-right: 5px;
  margin: 0;

  &:first-child {
    padding-left: 17px;
  }

  &:last-child {
    padding-left: 8px;
  }

  & + & {
    margin-top: 0;
  }
  & > div {
    width: 100%;
  }
`;

export default DataPlaceholder;
