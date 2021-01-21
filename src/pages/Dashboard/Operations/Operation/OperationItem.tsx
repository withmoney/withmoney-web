import React from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import { toast } from 'react-toastify';
import moment, { Moment } from 'moment';
import { useUpdateOperation, useDeleteOperation } from '../../../../hooks/useOperations';
import { LANG, CURRENCY } from '../../../../constants/currency';
import ButtonIcon from '../../../../components/ButtonIcon';
import CheckBox from '../../../../components/Checkbox';
import DatePicker from '../../../../components/DatePicker';
import InputOperations from './InputOptions';
import CategorySelect from './CategorySelect';
import InputCurrency from '../../../../components/InputCurrency';
import { Operation } from '../../../../models';
import { TrashFill } from '@styled-icons/bootstrap';

type OperationItemProps = {
  operation: Operation;
  modalIsOpen: (value: boolean) => void;
  deleteOperation: (value: Operation) => void;
};

const OperationItem = ({ operation, modalIsOpen, deleteOperation }: OperationItemProps) => {
  const { updateOperation } = useUpdateOperation();
  const { loading } = useDeleteOperation();
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
      paidAt: moment(date).format(),
    });
  };

  const handleUpdate = async (newValues: Partial<Operation>) => {
    try {
      await updateOperation({
        variables: {
          ...operation,
          accountId: operation.account.id,
          categoryId: operation.category ? operation.category.id : '',
          ...newValues,
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };
  const onDeleteOperationClick = (operation: Operation) => {
    deleteOperation(operation);
    modalIsOpen(true);
  };

  return (
    <OperationComponent key={operation.id}>
      <InputComponent>
        <CheckBox onChange={toggleInputIsPaid} checked={operation.isPaid} />
      </InputComponent>
      <InputComponent>
        <DatePicker
          id={operation.id}
          defaultValue={operation.paidAt}
          onDateChange={handleDateChange}
        />
      </InputComponent>
      <InputComponent>
        <InputOperations onChange={toggleInputName} value={operation.name} />
      </InputComponent>
      <InputComponent>
        <CategorySelect
          operation={operation}
          CategoryId={operation.category ? operation.category.id : ''}
        />
      </InputComponent>
      <InputComponent>
        <InputCurrency
          onChange={toggleInputCurrency}
          value={operation.value}
          currency={CURRENCY}
          lang={LANG}
        />
      </InputComponent>
      <InputComponent>
        <ButtonIcon
          type="button"
          variation="danger"
          onClick={() => onDeleteOperationClick(operation)}
        >
          <TrashFill />
        </ButtonIcon>
      </InputComponent>
    </OperationComponent>
  );
};

const InputComponent = styled.div``;

const OperationComponent = styled.div`
  display: grid;
  grid-template-columns: 60px 120px 250px 250px 250px 60px;
  align-items: center;
  justify-content: center;
  grid-gap: 15px;
  margin-bottom: 10px;
  margin-left: 15px;
`;

export default OperationItem;
