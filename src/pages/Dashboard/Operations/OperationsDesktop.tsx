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

type OperationsDesktopProps = {
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

export const OperationsDesktop = ({
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
}: OperationsDesktopProps) => {
  const { t } = useTranslation('operations');

  return (
    <Container>
      <Tabs filterVisibility={filterVisibility} onToggleFilterVisibility={toggleFilterVisibility} />
      <OperationContainer>
        {filterVisibility && currentTransactionType && (
          <OperationFilter type={currentTransactionType} onChange={onChangeCategoryFilter} />
        )}
        <RowHeader>
          <CellHeader width="80px">{t('isPaid')}</CellHeader>
          <CellHeader width="130px">{t('date')}</CellHeader>
          <CellHeader flex="1">{t('name')}</CellHeader>
          <CellHeader flex="1">{t('category')}</CellHeader>
          {/* {currentTransactionType === TransactionType.CreditCard && (
            <CellHeader width="200px">{t('creditCard')}</CellHeader>
          )} */}
          <CellHeader width="200px">{t('value')}</CellHeader>
          <CellHeader width="56px">{t('action')}</CellHeader>
        </RowHeader>
        <DataPlaceholder isLoading={loading} />
        {!!operations.length &&
          operations.map((operation) => (
            <OperationItem
              modalIsOpen={setModalIsOpen}
              deleteOperation={setSelectOperation}
              key={operation.id}
              operation={operation}
            />
          ))}
        {!loading && !operations.length && <OperationPlaceholder onClick={handleCreateOperation} />}
        <ButtonContent>
          <OperationButton
            variation="primary"
            color={currentTransactionType || 'Income'}
            disabled={loadingCreate}
            onClick={handleCreateOperation}
            type="button"
            rounded
          >
            {loadingCreate ? (
              <LoadingSpinner inButton size="20px" />
            ) : currentTransactionType === 'Income' ? (
              <PlusCircle />
            ) : (
              <MinusCircle />
            )}
            <span>
              <Text variation="white">
                {t(addOperationText[currentTransactionType || 'Income'])}
              </Text>
            </span>
          </OperationButton>
        </ButtonContent>
      </OperationContainer>
      <FooterContainer />
    </Container>
  );
};
