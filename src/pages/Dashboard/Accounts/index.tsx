import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { TrashFill, PencilFill } from '@styled-icons/bootstrap';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import ButtonLink from '../../../components/ButtonLink';
import Text from '../../../components/Text';
import ConfirmModal from '../../../modals/ConfirmModal';
import { useAccounts, useDeleteAccount, useRestoreAccount } from '../../../hooks/useAccounts';
import { useAccountFilters } from '../../../hooks/useAccountFilters';
import { Account } from '../../../models';
import LoadingData from '../../../components/LoadingData';
import { Page, PageHeader, Row, Cell, PageBodyColumns } from './styles';

const Accounts = () => {
  const { data, loading, error } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const { currentAccountId } = useAccountFilters();
  const [openModal, setOpenModal] = useState(false);
  const { restoreAccount, loading: loadingRestore } = useRestoreAccount();
  const { deleteAccount, loading: loadingDelete } = useDeleteAccount();

  //Delete Account
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount({ variables: { id: selectedAccount?.id } });
      setOpenModal(false);
      toast.error('Account deleted. Click here to restore!', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 10000,
        draggable: false,
        onClick: () => handleRestoreAccount(),
      });
    } catch (err) {
      toast.error(err.message);
    }
  };
  //Restore Account
  const handleRestoreAccount = async () => {
    try {
      await restoreAccount({ variables: { id: selectedAccount?.id } });
      toast.success('Account has been successfully restored!', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 8000,
        draggable: false,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleDeleteAccount = (account: Account) => {
    setSelectedAccount(account);
    setOpenModal(true);
  };

  return (
    <Page>
      <ConfirmModal
        label="Are you sure that you want to delete this account?"
        confirmButton="danger"
        loading={loadingDelete}
        isOpenModal={openModal}
        onConfirm={handleDeleteAccount}
        setIsOpenModal={setOpenModal}
      />
      <PageHeader>
        <Header margin="0" as="h3">
          Accounts
        </Header>
        <ButtonLink type="button" to="/accounts-new" variation="primary">
          Add new
        </ButtonLink>
      </PageHeader>
      <PageBodyColumns>
        <Row>
          <Cell>
            <Text>Name</Text>
          </Cell>
          <Cell>
            <Text>Currency</Text>
          </Cell>
          <Cell>
            <Text>Action</Text>
          </Cell>
        </Row>
        {loading && <LoadingData />}
        {data?.me.accounts &&
          data.me.accounts.map((account) => (
            <Row key={account.id}>
              <Cell>
                <Text>{account.name}</Text>
              </Cell>
              <Cell>
                <Text>{account.currency}</Text>
              </Cell>
              {account.id === currentAccountId ? (
                <Cell>
                  <ButtonLink
                    style={{ marginRight: '10px' }}
                    type="button"
                    to={'/accounts-edit/' + account.id}
                    variation="primary"
                  >
                    <PencilFill />
                  </ButtonLink>
                  <Button type="button" disabled variation="danger">
                    <TrashFill />
                  </Button>
                </Cell>
              ) : (
                <Cell>
                  <ButtonLink
                    style={{ marginRight: '10px' }}
                    to={'/accounts-edit/' + account.id}
                    type="button"
                    variation="primary"
                  >
                    <PencilFill />
                  </ButtonLink>
                  <Button
                    onClick={() => toggleDeleteAccount(account)}
                    disabled={loading}
                    type="button"
                    variation="danger"
                  >
                    <TrashFill />
                  </Button>
                </Cell>
              )}
            </Row>
          ))}
        {error && window.alert(error.message)}
      </PageBodyColumns>
    </Page>
  );
};

export default Accounts;
