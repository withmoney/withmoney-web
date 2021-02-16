import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from 'lodash.debounce';
import { useFilterCreditCards, useCreateCreditCard } from '../../../../hooks/useCreditCard';
import customStyles from './style/CategorySelect.style';
import { CREDIT_CARDS } from '../../../../graphql/CreditCard';
import { Operation, CreditCards } from '../../../../models';
import { useUpdateOperation } from '../../../../hooks/useOperations';
import Input from '../../../../components/Input';
import CreditCardModal from '../../../../modals/CreditCardModal';
import { CreditCardBrand } from '../../../../models';
import { useAccountFilters } from '../../../../hooks/useAccountFilters';

// Props
type Props = {
  operation: Operation;
};

type Option = {
  value: string;
  label: string;
};

// default Values
const initialValues = {
  name: '',
  brand: CreditCardBrand.AmericanExpress,
  limit: 0,
};

// Component
const CreditCardSelect = ({ operation }: Props) => {
  const { currentAccount } = useAccountFilters();
  const [value, setValue] = useState<Option | undefined>();
  const { createCreditCard, loading: loadingCreateCard } = useCreateCreditCard();
  const [form, setForm] = useState(initialValues);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { updateOperation } = useUpdateOperation();
  const filterCreditCards = useFilterCreditCards();
  const { data, loading } = useQuery<CreditCards>(CREDIT_CARDS, {
    fetchPolicy: 'network-only',
    variables: { id: currentAccount?.id },
  });

  // filterCreditCards
  const loadOptions = debounce((value: string, callback: any) => {
    filterCreditCards(value).then((results: Option[]) => callback(results));
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
      const { data: dataCreditCard } = await createCreditCard({
        variables: {
          ...form,
          account: currentAccount?.id,
        },
      });

      if (dataCreditCard?.createOneCreditCard) {
        const creditCard = dataCreditCard.createOneCreditCard;
        await updateOperation({
          variables: {
            ...operation,
            creditCardId: creditCard.id,
          },
        });
        setValue({ value: creditCard.id, label: creditCard.name });
      }
      setModalIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const defaultValues = data?.creditCards.data
    .map((creditCard) => ({
      value: creditCard.id,
      label: creditCard.name,
    }))
    .filter((creditCard) => {
      return creditCard.value === operation.creditCardId;
    });

  const defaultOptions = data?.creditCards.data
    .filter((creditCard) => creditCard)
    .map((creditCard) => ({
      value: creditCard.id,
      label: creditCard.name,
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
        value={value}
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

export default CreditCardSelect;
