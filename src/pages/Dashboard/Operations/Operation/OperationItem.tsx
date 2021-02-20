import React from 'react';
import debounce from 'lodash.debounce';
import { toast } from 'react-toastify';
import moment, { Moment } from 'moment';
import { useTranslation } from 'react-i18next';
import { useUpdateOperation } from 'hooks/useOperations';
import { useUserLanguage } from 'hooks/useUser';
import ButtonIcon from 'components/ButtonIcon';
import CheckBox from 'components/Checkbox';
import DatePicker from 'components/DatePicker';
import InputOperations from './InputOptions';
import CategorySelect from './CategorySelect';
import CreditCardSelect from './CreditCardSelect';
import InputCurrency from 'components/InputCurrency';
import { Operation } from 'models';
import { TrashFill } from '@styled-icons/bootstrap';
import { Row, Cell } from 'pages/Dashboard/Operations/Operation/style/OperationSettings';
import { useAccountFilters } from 'hooks/useAccountFilters';
import { TransactionType } from 'models';
import LoadingData from 'components/LoadingData';

type OperationItemProps = {
  operation: Operation;
  modalIsOpen: (value: boolean) => void;
  deleteOperation: (value: Operation) => void;
};

const OperationItem = ({ operation, modalIsOpen, deleteOperation }: OperationItemProps) => {
  const { t } = useTranslation('operations');
  const { updateOperation } = useUpdateOperation();
  const { currentAccount } = useAccountFilters();
  const { value: language } = useUserLanguage();
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
          accountId: operation.accountId,
          categoryId: operation.categoryId || null,
          ...newValues,
        },
      });
    } catch (err) {
      toast.error(err.message, { position: toast.POSITION.BOTTOM_LEFT, draggable: false });
    }
  };
  const toggleDeleteOperation = (operation: Operation) => {
    deleteOperation(operation);
    modalIsOpen(true);
  };

  return language && operation ? (
    <>
      <Row key={operation.id} alignItems="center">
        <Cell width="80px">
          <CheckBox onChange={toggleInputIsPaid} checked={operation.isPaid} />
        </Cell>
        <Cell width="130px">
          <DatePicker
            id={operation.id}
            defaultValue={operation.paidAt}
            onDateChange={handleDateChange}
          />
        </Cell>
        <Cell flex="1">
          <InputOperations
            placeholder={t('name')}
            onChange={toggleInputName}
            value={operation.name}
          />
        </Cell>
        <Cell flex="1">
          <CategorySelect operation={operation} CategoryId={operation.categoryId} />
        </Cell>
        {operation.type === TransactionType.CreditCard && (
          <Cell width="200px">
            <CreditCardSelect operation={operation} />
          </Cell>
        )}
        <Cell width="200px">
          <InputCurrency
            onChange={toggleInputCurrency}
            value={operation.value}
            currency={currentAccount?.currency}
            lang={language}
          />
        </Cell>
        <Cell width="56px">
          <ButtonIcon
            type="button"
            variation="danger"
            onClick={() => toggleDeleteOperation(operation)}
          >
            <TrashFill />
          </ButtonIcon>
        </Cell>
      </Row>
    </>
  ) : (
    <LoadingData />
  );
};

export default OperationItem;
