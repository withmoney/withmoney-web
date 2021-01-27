import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { TrashFill, PencilFill } from '@styled-icons/bootstrap';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import ButtonLink from '../../../components/ButtonLink';
import Text from '../../../components/Text';
import Modal from '../../../modals/DeleteModal';
import { useAccounts, useDeleteAccount, useRestoreAccount } from '../../../hooks/useAccounts';
import { useAccountFilters } from '../../../hooks/useAccountFilters';
import { Account } from '../../../models';
import LoadingData from '../../../components/LoadingData';

const Accounts = () => {
  const { data, loading, error } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const { currentAccountId } = useAccountFilters();
  const [openModal, setOpenModal] = useState(false);
  const { restoreAccount } = useRestoreAccount();
  const { deleteAccount, loading: loadingDelete } = useDeleteAccount();

  //Delete Account
  const handleDeleteAccount = () => {
    try {
      deleteAccount({ variables: { id: selectedAccount?.id } });
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
  const handleRestoreAccount = () => {
    try {
      restoreAccount({ variables: { id: selectedAccount?.id } });
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
      <Modal
        label="account"
        loading={loadingDelete}
        isOpenModal={openModal}
        handleDelete={handleDeleteAccount}
        setIsOpenModal={setOpenModal}
      />
      <PageHeader>
        <Header margin="0" as="h3">
          Accounts
        </Header>
        <ButtonLink type="button" to="/createAccount" variation="primary">
          Add new
        </ButtonLink>
      </PageHeader>
      <PageBody>
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
                  <Button
                    style={{ marginRight: '10px' }}
                    type="button"
                    disabled
                    variation="primary"
                  >
                    <PencilFill />
                  </Button>
                  <Button type="button" disabled variation="danger">
                    <TrashFill />
                  </Button>
                </Cell>
              ) : (
                <Cell>
                  <ButtonLink
                    style={{ marginRight: '10px' }}
                    to={'/updateAccount/' + account.id}
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
        {error && toast.error(error.message)}
      </PageBody>
    </Page>
  );
};

const PageHeader = styled.div`
  display: flex;
  padding: 18px 44px;
  background-color: #e4e4e4;
  justify-content: space-between;
`;

const PageBody = styled.div`
  padding: 35px;
  background-color: #ffff;
  div:nth-child(even) {
    background-color: rgb(244, 244, 244);
  }
`;

const Row = styled.div`
  display: flex;
  height: 45px;
  padding: 13px;
  align-items: center;
  justify-content: space-between;
`;

const Cell = styled.span`
  display: flex;
  justify-content: center;
  min-width: 150px;
  &:first-child {
    width: 100%;
    justify-content: start;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 40px;
  background-color: red;
`;

const Page = styled.div`
  background-color: #fff;
  height: 100%;
`;

export default Accounts;
