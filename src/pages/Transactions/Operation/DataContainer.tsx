import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import { currencyFormat } from '../../../utils/currency';
import { LANG, CURRENCY } from '../../../constants/currency';
import { useOperations } from '../../../hooks/useOperations';
import Button from '../../../components/Button';
import CheckBox from '../../../components/Checkbox';
import Table from '../Components/Table';
import Input from '../../../components/Input';
import { DataCategorySelect } from './DataCategorySelect';

const DataContainer = () => {
  const { currentTransactionType } = useOperationsFilters();
  const { data } = useOperations();
  return (
    <>
      {!!data?.me?.operations?.length &&
        data.me?.operations
          ?.filter((operation) => operation.type === currentTransactionType)
          .map((operation) => {
            const date = DateTime.fromISO(operation.createdAt);
            return (
              <Table.Row key={operation.id}>
                <Table.Cell>
                  <CheckBox readOnly checked={operation.isPaid} />
                </Table.Cell>
                <Table.Cell>
                  <InputOperations
                    readOnly
                    value={`${date.day}`.padStart(2, '0') + '/' + `${date.month}`.padStart(2, '0')}
                  />
                </Table.Cell>
                <Table.Cell>
                  <InputOperations readOnly value={operation.name} />
                </Table.Cell>
                <Table.Cell>
                  <DataCategorySelect />
                </Table.Cell>
                <Table.Cell>
                  <InputOperations
                    readOnly
                    value={currencyFormat(LANG, CURRENCY, operation.value)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button variation="danger">Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
    </>
  );
};

const InputOperations = styled(Input)`
  height: 40px;
`;

export default DataContainer;
