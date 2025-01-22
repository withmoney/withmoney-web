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
import InputCurrency from 'components/InputCurrency';
import { Operation } from 'models';
import { TrashFill } from '@styled-icons/bootstrap';
import { Row, Cell } from 'pages/Dashboard/Operations/Operation/style/OperationSettings';
import { useAccountFilters } from 'hooks/useAccountFilters';
import LoadingData from 'components/LoadingData';
import { OperationFieldsFragment } from 'graphql-service/types';
import { PaymentMethodSelect } from './PaymentMethodSelect';

type OperationItemProps = {
  operation: OperationFieldsFragment;
  modalIsOpen: (value: boolean) => void;
  deleteOperation: (value: OperationFieldsFragment) => void;
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
  }, 300);

  const handleInputName = debounce((value: string) => {
    handleUpdate({
      name: value,
    });
  }, 300);

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
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
    }
  };
  const toggleDeleteOperation = (operation: OperationFieldsFragment) => {
    deleteOperation(operation);
    modalIsOpen(true);
  };

  return language && operation ? (
    <>
      <Row key={operation.id} alignItems="center">
        <Cell width="50px" justifyContent="center">
          <CheckBox onChange={toggleInputIsPaid} checked={operation.isPaid} />
        </Cell>
        <Cell width="130px">
          <DatePicker
            id={operation.id}
            defaultValue={operation.paidAt ?? ''}
            onDateChange={handleDateChange}
          />
        </Cell>
        <Cell className="flex-1">
          <InputOperations
            placeholder={t('name')}
            onChange={handleInputName}
            value={operation.name}
          />
        </Cell>
        <Cell className="w-[180px]">
          <CategorySelect operation={operation} CategoryId={operation.categoryId ?? null} />
        </Cell>
        <Cell className="w-[180px]">
          <PaymentMethodSelect
            operation={operation}
            paymentMethodId={operation.paymentMethodId ?? null}
          />
        </Cell>
        <Cell width="150px">
          <InputCurrency
            onChange={toggleInputCurrency}
            value={operation.value}
            currency={currentAccount?.currency as string}
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
