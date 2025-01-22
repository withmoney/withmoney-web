import { useState } from 'react';
import { toast } from 'react-toastify';
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import Input from 'components/Input';
import { useFilterCategories } from 'hooks/useCategories';
import { useUpdateOperation } from 'hooks/useOperations';
import customStyles from './style/CategorySelect.style';
import { OperationFieldsFragment, SortOrder } from 'graphql-service/types';
import { usePaymentMethodCreateOneMutation, usePaymentMethodsQuery } from 'graphql-service/hooks';
import { useAccountFilters } from 'hooks/useAccountFilters';

type Props = {
  paymentMethodId: string | null;
  operation: OperationFieldsFragment;
};

type Option = {
  value: string;
  label: string;
};

export const PaymentMethodSelect = ({ paymentMethodId, operation }: Props) => {
  const [value, setValue] = useState<Option | undefined>();
  const { currentAccount } = useAccountFilters();
  const { data: allPaymentMethods, loading } = usePaymentMethodsQuery({
    variables: {
      where: {
        accountId: {
          equals: currentAccount?.id,
        },
      },
      take: 1000,
      orderBy: { name: SortOrder.Asc },
    },
    fetchPolicy: 'cache-and-network',
  });
  const [paymentMethodCreate] = usePaymentMethodCreateOneMutation();
  const { updateOperation } = useUpdateOperation();
  const filterCategory = useFilterCategories();
  const { t } = useTranslation('categories');

  const loadOptions = debounce((value: string, callback: (results: Option[]) => void) => {
    filterCategory(value).then((results: Option[]) => callback(results));
  }, 400);

  const create = async (value: string) => {
    if (!currentAccount?.id) return;
    try {
      const { data } = await paymentMethodCreate({
        variables: { input: { name: value, accountId: currentAccount.id } },
      });

      if (data?.paymentMethodCreateOne.data) {
        await updateOperation({
          variables: {
            ...operation,
            accountId: operation.accountId,
            paymentMethodId: data?.paymentMethodCreateOne.data.id,
          },
        });
        setValue({
          value: data?.paymentMethodCreateOne.data.id,
          label: data?.paymentMethodCreateOne.data.name,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
    }
  };

  const update = (data: { value: string; label: string }) => {
    if (paymentMethodId !== data.value) {
      try {
        updateOperation({
          variables: {
            ...operation,
            accountId: operation.accountId,
            paymentMethodId: data.value,
          },
        });
        setValue(data);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, { position: 'bottom-left', draggable: false });
        }
      }
    }
  };

  const defaultValues = allPaymentMethods?.paymentMethods?.data
    .map((paymentMethod) => ({
      value: paymentMethod.id,
      label: paymentMethod.name,
    }))
    .filter((paymentMethod) => paymentMethod.value === paymentMethodId);

  const defaultOptions = allPaymentMethods?.paymentMethods?.data.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return loading ? (
    <Input defaultValue="loading" disabled />
  ) : (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <AsyncCreatableSelect
      cacheOptions
      value={value}
      defaultOptions={defaultOptions}
      defaultValue={defaultValues}
      aria-label={t('placeholderSelector')}
      loadOptions={loadOptions}
      placeholder={t('placeholderSelector')}
      onCreateOption={create}
      styles={customStyles}
      onChange={update}
    />
  );
};
