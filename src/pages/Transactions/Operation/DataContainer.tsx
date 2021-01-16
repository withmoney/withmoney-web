import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import debounce from 'lodash.debounce';
import { toast } from 'react-toastify';
import { useUpdateOperation } from '../../../hooks/useOperations';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import { LANG, CURRENCY } from '../../../constants/currency';
import { useOperations } from '../../../hooks/useOperations';
import Button from '../../../components/Button';
import CheckBox from '../../../components/Checkbox';
import Table from '../Components/Table';
import Input from '../../../components/Input';
import CategorySelect from './CategorySelect';
import InputCurrency from '../../../components/InputCurrency';
import { Operation } from '../../../models';

const DataContainer = () => {
  const { currentTransactionType } = useOperationsFilters();
  const { data } = useOperations();
  const { updateOperation } = useUpdateOperation();

  const toggleInputCurrency = debounce((value: number, operation: Operation) => {
    updateOperation({
      variables: {
        id: operation.id,
        name: operation.name,
        type: operation.type,
        accountId: operation.account.id,
        categoryId: operation.category.id,
        value: value,
        isPaid: operation.isPaid,
      },
    })
      .then()
      .catch((err) => toast.error(err.message));
  }, 1000);

  return (
    <>
      {!!data?.me?.operations?.length &&
        data.me?.operations
          ?.filter((operation) => operation.type === currentTransactionType)
          .map((operation) => {
            const date = DateTime.fromISO(operation.paidAt);
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
                  <CategorySelect
                    OperationData={operation}
                    CategoryId={operation.category ? operation.category.id : ''}
                  />
                </Table.Cell>
                <Table.Cell>
                  <InputCurrency
                    onChange={(value: number) => toggleInputCurrency(value, operation)}
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

export default DataContainer;
