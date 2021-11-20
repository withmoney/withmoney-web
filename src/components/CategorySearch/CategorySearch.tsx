import React from 'react';
import Async from 'react-select/async';
import { useTranslation } from 'react-i18next';
import { OperationVariables, useApolloClient, useQuery, gql } from '@apollo/client';

import customStyles from 'pages/Dashboard/Operations/Operation/style/CategorySelect.style';
import LoadingData from 'components/LoadingData';

import { TransactionType, SortOrder, Categories } from 'models';

const GET_CATEGORIES = gql`
  query Categories(
    $skip: Int
    $take: Int
    $where: CategoryWhereInput
    $orderBy: [CategoryOrderByInput!]
  ) {
    categories: findManyCategory(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
      data {
        id
        name
        type
      }
      pagination {
        totalItems
      }
    }
  }
`;

type Props = {
  type: TransactionType;
  onChange: (categoryId: string | null) => void;
};

const CategorySearch = ({ type, onChange }: Props) => {
  const client = useApolloClient();
  const { t } = useTranslation('operations');

  console.log({ type });

  const { data, loading } = useQuery<Categories>(GET_CATEGORIES, {
    variables: {
      skip: 0,
      take: 25,
      where: {
        type: {
          equals: type,
        },
        deletedAt: { equals: null },
      },
      orderBy: [{ name: SortOrder.ASC }],
    },
  });

  const defaultOptions = (data?.categories?.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const getCategories = (variables: OperationVariables) =>
    client.query<Categories>({
      query: GET_CATEGORIES,
      variables,
    });

  const handleChange = (option: any) => {
    onChange(option?.value ?? null);
  };

  async function handleLoadOptions(value: string) {
    const { data: dataCategories } = await getCategories({
      skip: 0,
      take: 25,
      where: {
        name: {
          contains: value,
        },
        type: {
          equals: type,
        },
        deletedAt: { equals: null },
      },
      orderBy: [{ name: SortOrder.ASC }],
    });

    if (dataCategories?.categories?.data?.length) {
      return dataCategories?.categories?.data.map((category) => ({
        label: category.name,
        value: category.id,
      }));
    }

    return [];
  }

  const loadOptions = (value = '') => handleLoadOptions(value);

  if (loading) {
    return <LoadingData />;
  }

  return (
    <Async
      isSearchable
      placeholder={t('categorySearch')}
      defaultOptions={defaultOptions}
      loadOptions={loadOptions}
      onChange={handleChange}
      customStyles={customStyles}
      isClearable
    />
  );
};

export default CategorySearch;
