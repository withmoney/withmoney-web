import React from 'react';
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
import InputOperations from './InputOptions';
import CategorySelect from './CategorySelect';
import InputCurrency from '../../../components/InputCurrency';
import DatePicker from './DatePicker';
import { Operation } from '../../../models';

const DataContainer = () => {
  const { data } = useOperations();
  const { currentTransactionType } = useOperationsFilters();
  const { updateOperation } = useUpdateOperation();

  const toggleInputCurrency = debounce((value: number, operation: Operation) => {
    try {
      updateOperation({
        variables: {
          id: operation.id,
          name: operation.name,
          type: operation.type,
          accountId: operation.account.id,
          categoryId: operation.category ? operation.category.id : '',
          value: value,
          isPaid: operation.isPaid,
          paidAt: operation.paidAt,
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  }, 800);

  const toggleInputName = debounce((value: string, operation: Operation) => {
    try {
      updateOperation({
        variables: {
          id: operation.id,
          name: value,
          type: operation.type,
          accountId: operation.account.id,
          categoryId: operation.category ? operation.category.id : '',
          value: operation.value,
          isPaid: operation.isPaid,
          paidAt: operation.paidAt,
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  }, 800);

  const toggleInputIsPaid = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    operation: Operation,
  ) => {
    try {
      updateOperation({
        variables: {
          id: operation.id,
          name: operation.name,
          type: operation.type,
          accountId: operation.account.id,
          categoryId: operation.category ? operation.category.id : '',
          value: operation.value,
          isPaid: checked,
          paidAt: operation.paidAt,
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {!!data?.me.operations &&
        data.me.operations
          .filter((operation) => operation.type === currentTransactionType)
          .map((operation) => {
            const date = DateTime.fromISO(operation.paidAt);
            return (
              <Table.Row key={operation.id}>
                <Table.Cell>
                  <CheckBox
                    onChange={(event) => toggleInputIsPaid(event, operation)}
                    checked={operation.isPaid}
                  />
                </Table.Cell>
                <Table.Cell>
                  <DatePicker operation={operation} />
                </Table.Cell>
                <Table.Cell>
                  <InputOperations
                    onChange={(value) => toggleInputName(value, operation)}
                    value={operation.name}
                  />
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

export default DataContainer;
