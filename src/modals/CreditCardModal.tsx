import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Text from '../components/Text';
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';
import InputControl from '../components/InputControl';
import Select from '../components/Select';
import Flex from '../components/Flex';
import LoadingSpinner from '../components/LoadingSpinner';
import InputCurrency from '../components/InputCurrency';
import { CreatedCardBrandText } from '../constants/Transactions';
import { useAccountFilters } from '../hooks/useAccountFilters';
import { ModalBody, ModalHeader, stylesCreditCard } from './ConfirmModal.style';
import { checkCreditCard } from '../schema/checkField';

type Props = {
  form: any;
  isOpenModal: boolean;
  isLoading: boolean;
  setIsOpenModal: (value: boolean) => void;
  setForm: (value: any) => void;
  onConfirm: () => void;
};

const initialValues = {
  name: '',
  brand: '',
  limit: '',
};

const CreditCardModal = ({
  form,
  isLoading,
  isOpenModal,
  setIsOpenModal,
  onConfirm,
  setForm,
}: Props) => {
  Modal.setAppElement('body');
  const { currentAccount } = useAccountFilters();
  const [formValidate, setFormValidate] = useState(false);
  const [formErrors, setFormErrors] = useState(initialValues);

  useEffect(() => {
    const checkForm = async () => {
      setFormValidate(await checkCreditCard.isValid(form));
    };
    checkForm();
  });

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCurrency = async (value: number) => {
    setForm({
      ...form,
      limit: value,
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
      <Modal style={stylesCreditCard} isOpen={isOpenModal}>
        <ModalHeader>
          <Text bold>Create Credit Card</Text>
        </ModalHeader>
        <ModalBody>
          <Form style={{ padding: '0' }}>
            <InputControl isInvalid={!!formErrors.name} message={formErrors.name}>
              <Label>Card Name</Label>
              <Input onBlur={handleBlur} name="name" onChange={handleInput} value={form.name} />
            </InputControl>

            <InputControl isInvalid={!!formErrors.brand} message={formErrors.brand}>
              <Label>Card Flag</Label>
              <Select
                onBlur={handleBlur}
                defaultValue={form.brand}
                name="brand"
                onChange={handleInput}
                style={{ width: '100%' }}
              >
                {CreatedCardBrandText.map((brand) => (
                  <option value={brand} key={brand}>
                    {brand}
                  </option>
                ))}
              </Select>
            </InputControl>

            <InputControl isInvalid={!!formErrors.limit} message={formErrors.limit}>
              <Label>Card Limit</Label>
              <InputCurrency
                onBlur={handleBlur}
                value={form.limit}
                name="limit"
                onChange={handleCurrency}
                lang="pt-BR"
                currency={currentAccount?.currency}
                placeholder="Card limit"
              />
            </InputControl>

            <Flex justifyContent="flex-end">
              <Button onClick={() => setIsOpenModal(false)} variation="light" type="button">
                Cancel
              </Button>
              <Button
                disabled={!formValidate || isLoading}
                onClick={() => formValidate && onConfirm()}
                variation="primary"
                type="button"
              >
                {isLoading ? <LoadingSpinner size="20px" /> : 'Create'}
              </Button>
            </Flex>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

const Label = styled.label`
  padding: 5px;
`;

export default CreditCardModal;
