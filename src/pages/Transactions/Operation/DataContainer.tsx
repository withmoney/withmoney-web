import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { InputCurrency as InputCurrencyStyled } from '@davidcostadev/ui';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import { LANG, CURRENCY } from '../../../constants/currency';
import { useOperations } from '../../../hooks/useOperations';
import Button from '../../../components/Button';
import CheckBox from '../../../components/Checkbox';
import Table from '../Components/Table';
import Input from '../../../components/Input';

const DataContainer = () => {
  const { currentTransactionType } = useOperationsFilters();
  const { data } = useOperations();

  const toggleInputCurrency = (value: number) => {};

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
                  <InputOperations readOnly value={operation.category.name} />
                </Table.Cell>
                <Table.Cell>
                  <InputCurrency
                    onChange={toggleInputCurrency}
                    value={operation.value}
                    currency={CURRENCY}
                    lang={LANG}
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

const InputCurrency = styled(InputCurrencyStyled)`
  font-size: var(--font-default);
  width: 100%;
  border-radius: var(--input-border-radius);
  border: 2px solid var(--input-border-color);
  padding: var(--input-padding-vertical) var(--input-padding-horizontal);
  margin-bottom: var(--input-margin-bottom);
  outline: none;
  color: var(--text-default-color);

  &:hover {
    border-color: var(--input-border-color-hover);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--input-box-shadow);
    border-color: var(--input-border-color-focus);
  }

  &:active {
    border-color: var(--input-border-color-active);
  }

  &:disabled {
    border-color: var(--input-border-color-disabled);
    background-color: var(--input-disabled-background-color);
  }
`;

export default DataContainer;
