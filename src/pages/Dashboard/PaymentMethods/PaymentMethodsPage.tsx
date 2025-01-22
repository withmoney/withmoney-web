import React, { useState } from 'react';
import { TrashFill, PencilFill } from '@styled-icons/bootstrap';
import { toast } from 'react-toastify';
import Header from 'components/Header';
import Text from 'components/Text';
import Input from 'components/Input';
import { Page, PageHeader } from 'pages/Dashboard/style/SubPages.style';
import { Row, Cell, PageBodyColumns, PageBody } from 'pages/Dashboard/style/SubPages.style';
import LoadingData from 'components/LoadingData';
import Button from 'components/Button';
import ButtonLink from 'components/ButtonLink';
import ConfirmModal from 'modals/ConfirmModal';
import Pagination from 'components/Pagination';
import {
  PaymentMethodsDocument,
  usePaymentMethodDeleteOneMutation,
  usePaymentMethodRestoreOneMutation,
  usePaymentMethodsQuery,
} from 'graphql-service/hooks';
import { PaymentMethodFieldsFragment } from 'graphql-service/types';
import { useTranslation } from 'react-i18next';
import { useAccountFilters } from 'hooks/useAccountFilters';

const initialValues = {
  filterName: '',
};

const itemsPerPage = 10;

export const PaymentMethodsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState(initialValues);
  const { currentAccount } = useAccountFilters();
  const { data, loading, refetch } = usePaymentMethodsQuery({
    variables: {
      where: {
        name: {
          contains: filter.filterName,
        },
        accountId: {
          equals: currentAccount?.id,
        },
        deletedAt: {
          equals: null,
        },
      },
      skip: currentPage * itemsPerPage,
      take: itemsPerPage,
    },
    fetchPolicy: 'network-only',
  });
  const { t } = useTranslation('paymentMethods');

  const [deletePaymentMethod, { loading: loadingDelete }] = usePaymentMethodDeleteOneMutation();
  const [restoreCategory] = usePaymentMethodRestoreOneMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<PaymentMethodFieldsFragment | undefined>();

  const handleChangeFilter = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurrentPage(0);
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleDelete = async () => {
    if (!selectedEntity?.id) return;

    try {
      await deletePaymentMethod({
        variables: { where: { id: selectedEntity.id } },
        refetchQueries: [PaymentMethodsDocument],
      });
      setOpenModal(false);
      toast.error(t('deleteSuccess') as string, {
        position: 'bottom-left',
        autoClose: 10000,
        draggable: false,
        onClick: handleRestoreCategory,
        closeOnClick: true,
      });
      await refetch();
      setCurrentPage(0);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
    }
  };

  const handleRestoreCategory = async () => {
    if (!selectedEntity?.id) return;
    try {
      await restoreCategory({
        variables: { where: { id: selectedEntity.id } },
        refetchQueries: [PaymentMethodsDocument],
      });
      toast.success(t('restoreSuccess') as string, {
        position: 'bottom-left',
        autoClose: 8000,
        draggable: false,
      });
      await refetch();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
    }
  };

  const toggleDelete = (paymentMethod: PaymentMethodFieldsFragment) => {
    setSelectedEntity(paymentMethod);
    setOpenModal(true);
  };

  const paymentMethods = data?.paymentMethods?.data ?? [];

  return (
    <Page>
      <ConfirmModal
        onConfirm={handleDelete}
        setIsOpenModal={setOpenModal}
        isOpenModal={openModal}
        loading={loadingDelete}
        confirmButton="danger"
        label={t('deleteConfirmation')}
      />
      <PageHeader>
        <Header margin="0" as="h3">
          {t('title')}
        </Header>
        <ButtonLink type="button" to="/payment-method-new" variation="primary">
          {t('add')}
        </ButtonLink>
      </PageHeader>
      <PageBody>
        <Input
          name="filterName"
          type="text"
          onChange={handleChangeFilter}
          value={filter.filterName}
          placeholder={t('filterPaymentMethod')}
        />
      </PageBody>
      <PageBodyColumns>
        <Row>
          <Cell>
            <Text>{t('name')}</Text>
          </Cell>
          <Cell className="justify-end">
            <Text>{t('actions')}</Text>
          </Cell>
        </Row>
        {loading ? (
          <LoadingData repeat={itemsPerPage} />
        ) : (
          paymentMethods.map((paymentMethod) => {
            return (
              <Row key={paymentMethod.id}>
                <Cell>
                  <Text>{paymentMethod.name}</Text>
                </Cell>
                <Cell className="gap-2 justify-end">
                  <ButtonLink to={`/payment-method-edit/${paymentMethod.id}`} variation="primary">
                    <PencilFill />
                  </ButtonLink>
                  <Button
                    onClick={() => toggleDelete(paymentMethod)}
                    type="button"
                    variation="danger"
                  >
                    <TrashFill />
                  </Button>
                </Cell>
              </Row>
            );
          })
        )}
      </PageBodyColumns>
      {data?.paymentMethods?.data && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={data.paymentMethods.pagination?.totalItems ?? 0}
        />
      )}
    </Page>
  );
};
