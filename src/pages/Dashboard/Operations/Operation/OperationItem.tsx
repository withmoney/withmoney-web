import React from 'react';
import debounce from 'lodash.debounce';
import { toast } from 'react-toastify';
import moment, { Moment } from 'moment';

import { useUpdateOperation } from '../../../../hooks/useOperations';
import { LANG, CURRENCY } from '../../../../constants/currency';
import Button from '../../../../components/Button';
import CheckBox from '../../../../components/Checkbox';
import Table from '../../../../components/Table';
import DatePicker from '../../../../components/DatePicker';
import InputOperations from './InputOptions';
import CategorySelect from './CategorySelect';
import InputCurrency from '../../../../components/InputCurrency';
import { Operation } from '../../../../models';

type OperationItemProps = {
  operation: Operation;
};

const OperationItem = ({ operation }: OperationItemProps) => {
  const { updateOperation } = useUpdateOperation();

  const toggleInputCurrency = debounce((value: number) => {
    handleUpdate({
      value: value,
    });
  }, 800);

  const toggleInputName = debounce((value: string) => {
    handleUpdate({
      name: value,
    });
  }, 800);

  const toggleInputIsPaid = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdate({
      isPaid: checked,
    });
  };

  const handleDateChange = (date: Moment) => {
    handleUpdate({
      ...operation,
      paidAt: moment(date).format(),
    });
  };

  const handleUpdate = async (newValues: Partial<Operation>) => {
    try {
      await updateOperation({
        variables: {
          ...operation,
          ...newValues,
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Table.Row key={operation.id}>
      <Table.Cell width={80}>
        <CheckBox onChange={toggleInputIsPaid} checked={operation.isPaid} />
      </Table.Cell>
      <Table.Cell width={130}>
        <DatePicker
          id={operation.id}
          defaultValue={operation.paidAt}
          onDateChange={handleDateChange}
        />
      </Table.Cell>
      <Table.Cell style={{ width: 200 }}>
        <InputOperations onChange={toggleInputName} value={operation.name} />
      </Table.Cell>
      <Table.Cell style={{ width: 200 }}>
        <CategorySelect
          operation={operation}
          CategoryId={operation.category ? operation.category.id : ''}
        />
      </Table.Cell>
      <Table.Cell width={150}>
        <InputCurrency
          onChange={toggleInputCurrency}
          value={operation.value}
          currency={CURRENCY}
          lang={LANG}
        />
      </Table.Cell>
      <Table.Cell width={100}>
        <Button variation="danger">Delete</Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default OperationItem;
