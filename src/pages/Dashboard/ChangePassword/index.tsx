import React, { useState } from 'react';
import Header from '../../../components/Header';
import Flex from '../../../components/Flex';
import Form from '../../../components/Form';
import InputControl from '../../../components/InputControl';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Page, PageHeader, PageBody } from '../style/SubPages.style';
import { useUser } from '../../../hooks/useUser';
import { checkUpdatePassword } from '../../../schema/checkField';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const [form, setForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const { data, loading, error } = useUser();

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value.trim(),
    });
  };

  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    try {
      await checkUpdatePassword.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
      setFormValidate(await checkUpdatePassword.isValid(form));
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
      setFormValidate(await checkUpdatePassword.isValid(form));
    }
  };

  return (
    <Page>
      <PageHeader>
        <Header margin="auto" as="h3">
          Change Password
        </Header>
      </PageHeader>
      <PageBody>
        <Flex justifyContent="center">
          <Form>
            <InputControl
              message={formErrors.currentPassword}
              isInvalid={!!formErrors.currentPassword}
            >
              <Input
                type="password"
                onBlur={handleBlur}
                onChange={handleInput}
                name="currentPassword"
                placeholder="current password"
              />
            </InputControl>
            <InputControl message={formErrors.newPassword} isInvalid={!!formErrors.newPassword}>
              <Input
                type="password"
                onBlur={handleBlur}
                onChange={handleInput}
                name="newPassword"
                placeholder="new password"
              />
            </InputControl>

            <InputControl
              message={formErrors.confirmPassword}
              isInvalid={!!formErrors.confirmPassword}
            >
              <Input
                type="password"
                onBlur={handleBlur}
                onChange={handleInput}
                name="confirmPassword"
                placeholder="confirm your password"
              />
            </InputControl>
            <Flex justifyContent="flex-end">
              <Button disabled={!formValidate} variation="primary" type="submit">
                Update
              </Button>
            </Flex>
          </Form>
        </Flex>
      </PageBody>
    </Page>
  );
};

export default ChangePassword;
