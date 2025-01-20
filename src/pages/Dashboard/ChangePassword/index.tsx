import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from 'components/Header';
import Flex from 'components/Flex';
import Form from 'components/Form';
import InputControl from 'components/InputControl';
import Input from 'components/Input';
import Button from 'components/Button';
import { Page, PageHeader, PageBody } from 'pages/Dashboard/style/SubPages.style';
import { useUser, useUserChangePassword } from 'hooks/useUser';
import { checkUpdatePassword } from 'schema/checkField';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const [form, setForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const { data } = useUser();
  const history = useHistory();
  const { changeUserPassword } = useUserChangePassword();

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
      if (err instanceof Error) {
        setFormErrors({ ...formErrors, [name]: err.message });
      }
      setFormValidate(await checkUpdatePassword.isValid(form));
    }
  };

  const handleChangePassword = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (formValidate && data?.me) {
        await changeUserPassword({
          variables: { oldPassword: form.currentPassword, newPassword: form.newPassword },
        });
      } else {
        throw new Error('Invalid Password!');
      }
      toast.success('Password was changed successfully', {
        position: 'bottom-left',
        draggable: false,
      });
      history.push('/profile');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
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
              <Button
                onClick={handleChangePassword}
                disabled={!formValidate}
                variation="primary"
                type="submit"
              >
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
