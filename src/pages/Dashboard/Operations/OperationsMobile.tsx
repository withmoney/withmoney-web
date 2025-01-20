import { useTranslation } from 'react-i18next';
import { PlusCircle, MinusCircle } from '@styled-icons/boxicons-regular';
import { Tabs } from 'components/Tabs';
import DataPlaceholder from './Operation/DataPlaceholder';
import OperationItem from './Operation/OperationItem';
import FooterContainer from './Operation/FooterContainer';
import OperationPlaceholder from './Operation/OperationPlaceholder';
import { Container, OperationContainer, ButtonContent } from './style/Operations.style';
import { OperationButton } from './style/Operations.style';
import { RowHeader, CellHeader } from './Operation/style/OperationSettings';
import { addOperationText } from 'constants/Transactions';
import LoadingSpinner from 'components/LoadingSpinner';
import Text from 'components/Text';
import OperationFilter from './OperationFilter';
import { OperationFieldsFragment, TransactionType } from 'graphql-service/types';

type OperationsMobileProps = {
  filterVisibility: boolean;
  toggleFilterVisibility: () => void;
  currentTransactionType?: TransactionType;
  onChangeCategoryFilter: (categoryId: string | null) => void;
  operations: OperationFieldsFragment[];
  loading: boolean;
  setModalIsOpen: (value: boolean) => void;
  setSelectOperation: (operation: OperationFieldsFragment) => void;
  loadingCreate: boolean;
  handleCreateOperation: () => void;
};

export const OperationsMobile = ({
  filterVisibility,
  toggleFilterVisibility,
  currentTransactionType,
  onChangeCategoryFilter,
  operations,
  loading,
  setModalIsOpen,
  setSelectOperation,
  loadingCreate,
  handleCreateOperation,
}: OperationsMobileProps) => {
  const { t } = useTranslation('operations');

  return (
    <div>
      {operations.map((operation) => (
        <div key={operation.id}>
          {/* <p>{operation.id}</p>
          <p>{operation.creditCardId}</p>
          <p>{operation.accountId}</p>
          <p>{operation.categoryId}</p> */}
          <p className="font-bold text-base">{operation.name || `Sem titulo`}</p>
          <p className="font-bold text-base">{operation.value}</p>
          <p>{operation.isPaid ? 'Pago' : 'Não Pago'}</p>
          {operation.isPaid ?? <p>{operation.paidAt}</p>}
          <p>{operation.createdAt}</p>
        </div>
      ))}
    </div>
  );
};
