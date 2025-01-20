/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from 'lodash.debounce';
import { useFilterCreditCards, useCreateCreditCard } from 'hooks/useCreditCard';
import customStyles from './style/CategorySelect.style';
import { CREDIT_CARDS } from 'graphql-service/gqls/CreditCard';
import { Operation, CreditCards } from 'models';
import { useUpdateOperation } from 'hooks/useOperations';
import Input from 'components/Input';
import CreditCardModal from 'modals/CreditCardModal';
import { CreditCardBrand } from 'models';
import { useAccountFilters } from 'hooks/useAccountFilters';
import { ValueType } from 'react-select';

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
  const { t } = useTranslation('creditCards');
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
  const loadOptions = debounce((value: string, callback: (results: Option[]) => void) => {
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
  const update = async (data: ValueType<{ value: string; label: string }, false>) => {
    if (!data) return;

    try {
      await updateOperation({
        variables: {
          ...operation,
          creditCardId: data.value,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
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
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
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

      {/* @ts-ignore */}
      <AsyncCreatableSelect
        value={value}
        defaultOptions={defaultOptions}
        defaultValue={defaultValues}
        loadOptions={loadOptions}
        // @ts-ignore
        styles={customStyles}
        onCreateOption={openModal}
        onChange={update}
        aria-label={t('placeholderSelector')}
        placeholder={t('placeholderSelector')}
      />
    </>
  );
};

export default CreditCardSelect;
