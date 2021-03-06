import React, { useState, useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/creatable';
import { useTranslation } from 'react-i18next';
import Text from 'components/Text';
import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Input';
import InputControl from 'components/InputControl';
import Flex from 'components/Flex';
import LoadingSpinner from 'components/LoadingSpinner';
import InputCurrency from 'components/InputCurrency';
import { CreatedCardBrandText } from 'constants/Transactions';
import { useAccountFilters } from 'hooks/useAccountFilters';
import { ModalBody, ModalHeader, stylesCreditCard, StyledModal, Label } from './ConfirmModal.style';
import { checkCreditCard } from 'schema/checkField';
import customStyles from 'pages/Dashboard/Operations/Operation/style/CategorySelect.style';
import { useUserLanguage } from 'hooks/useUser';

// Component Props
type Props = {
  form: any;
  isOpenModal: boolean;
  isLoading: boolean;
  setIsOpenModal: (value: boolean) => void;
  setForm: (value: any) => void;
  onConfirm: () => void;
};

// default Values
const initialValues = {
  name: '',
  brand: '',
  limit: '',
};

const defaultOptions = CreatedCardBrandText.map((creditCard) => ({
  value: creditCard,
  label: creditCard,
}));

//Component
const CreditCardModal = ({
  form,
  isLoading,
  isOpenModal,
  setIsOpenModal,
  onConfirm,
  setForm,
}: Props) => {
  const { t } = useTranslation('creditCards');
  const { currentAccount } = useAccountFilters();
  const [formValidate, setFormValidate] = useState(false);
  const [formErrors, setFormErrors] = useState(initialValues);
  const { value: language } = useUserLanguage();

  StyledModal.setAppElement('body');

  //check form validate
  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await checkCreditCard.isValid(form));
    };
    checkForm();
  });
  // handle Name input
  const handleInput = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = event.target;
    setForm({
      ...form,
      name: value,
    });
  };
  // handle currency input
  const handleCurrency = async (value: number) => {
    setForm({
      ...form,
      limit: value,
    });
  };
  // handle creditCard input
  const handleCreditCard = async (brand: any) => {
    setForm({
      ...form,
      brand: brand.value,
    });
  };

  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    try {
      await checkCreditCard.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
    }
  };

  return (
    <>
      <StyledModal style={stylesCreditCard} isOpen={isOpenModal}>
        <ModalHeader>
          <Text bold>{t('modal.title')}</Text>
        </ModalHeader>
        <ModalBody>
          <Form style={{ padding: '0' }}>
            <InputControl isInvalid={!!formErrors.name} message={formErrors.name}>
              <Label>{t('modal.name')}</Label>
              <Input onBlur={handleBlur} name="name" onChange={handleInput} value={form.name} />
            </InputControl>

            <InputControl isInvalid={!!formErrors.brand} message={formErrors.brand}>
              <Label>{t('modal.brand')}</Label>
              <AsyncCreatableSelect
                defaultValue={{
                  value: form.brand,
                  label: form.brand,
                }}
                onChange={handleCreditCard}
                styles={customStyles}
                options={defaultOptions}
              />
            </InputControl>

            <InputControl isInvalid={!!formErrors.limit} message={formErrors.limit}>
              <Label>{t('modal.limit')}</Label>
              <InputCurrency
                name="limit"
                lang={language}
                value={form.limit}
                onBlur={handleBlur}
                onChange={handleCurrency}
                currency={currentAccount?.currency}
                placeholder={t('modal.limit')}
              />
            </InputControl>

            <Flex justifyContent="flex-end">
              <Button onClick={() => setIsOpenModal(false)} variation="light" type="button">
                {t('modal.cancel')}
              </Button>
              <Button
                disabled={!formValidate || isLoading}
                onClick={() => formValidate && onConfirm()}
                variation="primary"
                type="button"
              >
                {isLoading ? <LoadingSpinner size="20px" /> : t('modal.create')}
              </Button>
            </Flex>
          </Form>
        </ModalBody>
      </StyledModal>
    </>
  );
};

export default CreditCardModal;
