import React, { useState } from 'react';
import { TrashFill, PencilFill } from '@styled-icons/bootstrap';
import Header from '../../../components/Header';
import { Page, PageHeader, PageBody, Row, Cell, PageBodyColumns } from '../style/SubPages.style';
import ButtonLink from '../../../components/ButtonLink';
import { useCreditCards } from '../../../hooks/useCreditCard';
import { useAccountFilters } from '../../../hooks/useAccountFilters';
import LoadingData from '../../../components/LoadingData';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { CreditCard } from '../../../models';
import Pagination from '../../../components/Pagination';
import { currencyFormat } from '../../../utils/currency';
import { LANG } from '../../../constants/currency';

const initialValues = {
  filterName: '',
};

const CreditCards = () => {
  const { currentAccount } = useAccountFilters();
  const [currentPage, setCurrentPage] = useState(0);
  const [ItemsPerPage] = useState(5);
  const [filter, setFilter] = useState(initialValues);

  // All Credit Cards
  const { data, loading, refetch } = useCreditCards({
    variables: {
      name: filter.filterName,
      id: currentAccount?.id,
      skip: currentPage * ItemsPerPage,
      take: ItemsPerPage,
    },
    fetchPolicy: 'network-only',
  });

  // Filter Credit Card
  const handleChangeFilter = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurrentPage(0);
    const { value } = event.target;
    setFilter({
      filterName: value,
    });
  };

  return (
    <Page>
      <PageHeader>
        <Header margin="0" as="h3">
          Credit Cards
        </Header>
        <ButtonLink type="button" to="/credit-card-new" variation="primary">
          Add new
        </ButtonLink>
      </PageHeader>
      <PageBody>
        <Input
          name="filterName"
          type="text"
          value={filter.filterName}
          onChange={handleChangeFilter}
          placeholder="Filter Credit Card"
        />
        <PageBodyColumns style={{ padding: '35px 0' }}>
          <Row>
            <Cell>
              <Text>Name</Text>
            </Cell>
            <Cell>
              <Text>Limit</Text>
            </Cell>
            <Cell>
              <Text>Brand</Text>
            </Cell>
            <Cell>
              <Text>Action</Text>
            </Cell>
          </Row>
          {loading ? (
            <LoadingData repeat={5} />
          ) : (
            data?.creditCards.data &&
            data.creditCards.data.map((creditCard: CreditCard) => {
              return (
                <Row key={creditCard.id}>
                  <Cell>
                    <Text>{creditCard.name}</Text>
                  </Cell>
                  <Cell>
                    <Text>{currencyFormat(LANG, currentAccount?.currency, creditCard.limit)}</Text>
                  </Cell>
                  <Cell>
                    <Text>{creditCard.brand}</Text>
                  </Cell>
                  <Cell>
                    <ButtonLink
                      style={{ marginRight: '10px' }}
                      to={`/credit-cards-edit/` + creditCard.id}
                      variation="primary"
                    >
                      <PencilFill />
                    </ButtonLink>
                    <Button onClick={() => {}} type="button" variation="danger">
                      <TrashFill />
                    </Button>
                  </Cell>
                </Row>
              );
            })
          )}
        </PageBodyColumns>
        {data?.creditCards.data && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={ItemsPerPage}
            totalItems={data.creditCards.pagination.totalItems}
          />
        )}
      </PageBody>
    </Page>
  );
};

export default CreditCards;
