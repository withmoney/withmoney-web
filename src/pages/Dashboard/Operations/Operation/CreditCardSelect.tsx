import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from 'lodash.debounce';
import { useFilterCards, useCreateCategory } from '../../../../hooks/useCreditCard';
import customStyles from './style/CategorySelect.style';
import { ALL_CARDS } from '../../../../graphql/CreditCard';
import { Operation, CreditCard } from '../../../../models';
import { useUpdateOperation } from '../../../../hooks/useOperations';
import Input from '../../../../components/Input';
import CreditCardModal from '../../../../modals/CreditCardModal';
import { CreditCardBrand } from '../../../../models';
import { useAccountFilters } from '../../../../hooks/useAccountFilters';

type Props = {
  operation: Operation;
};

const CreditCardSelect = ({ operation }: Props) => {
  const { currentAccount } = useAccountFilters();
  const { createCreditCard, loading: loadingCreateCard } = useCreateCategory();
  const [form, setForm] = useState(initialValues);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { updateOperation } = useUpdateOperation();
  const filterCards = useFilterCards();
  const { data, loading } = useQuery<CreditCards>(ALL_CARDS, {
    variables: { id: currentAccount?.id },
  });

  // filterCards
  const loadOptions = debounce((value: string, callback: any) => {
    filterCards(value).then((results: Option[]) => callback(results));
  }, 400);

  // open Modal
  const openModal = (value: string) => {
    setForm({
      ...form,
      name: value,
    });

    setModalIsOpen(true);
  };

  // Update CreditCard
  const update = async (data: any) => {
    try {
      await updateOperation({
        variables: {
          ...operation,
          creditCardId: data.value,
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  // create Credit Card
  const createCard = async () => {
    try {
      await createCreditCard({
        variables: {
          ...form,
          account: currentAccount?.id,
        },
      });
      setModalIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const defaultValues = data?.allCards.data
    .map((card) => ({
      value: card.id,
      label: card.name,
    }))
    .filter((card) => {
      return card.value === operation.creditCardId;
    });

  const defaultOptions = data?.allCards.data
    .filter((card) => card)
    .map((card) => ({
      value: card.id,
      label: card.name,
    }));

  return loading ? (
    <Input defaultValue="loading" disabled />
  ) : (
    <>
      {modalIsOpen && (
        <CreditCardModal
          form={form}
          isOpenModal={modalIsOpen}
          isLoading={loadingCreateCard}
          setForm={setForm}
          setIsOpenModal={setModalIsOpen}
          onConfirm={createCard}
        />
      )}

      <AsyncCreatableSelect
        cacheOptions
        defaultOptions={defaultOptions}
        defaultValue={defaultValues}
        loadOptions={loadOptions}
        styles={customStyles}
        onCreateOption={openModal}
        onChange={update}
        aria-label="Select or Create"
        placeholder="Select or Create"
      />
    </>
  );
};

type Option = {
  value: string;
  label: string;
};

type CreditCards = {
  allCards: DataCards;
};

type DataCards = {
  data: CreditCard[];
};

const initialValues = {
  name: '',
  brand: CreditCardBrand.AmericanExpress,
  limit: 0,
};

export default CreditCardSelect;
