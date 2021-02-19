import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AsyncCreatableSelect from 'react-select/creatable';
import Header from 'components/Header';
import Flex from 'components/Flex';
import Form from 'components/Form';
import LoadingSpinner from 'components/LoadingSpinner';
import InputControl from 'components/InputControl';
import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import { Page, PageHeader, PageBody } from 'style/SubPages.style';
import { useUser, useUpdateUser } from 'hooks/useUser';
import { languages, languageLabels } from 'constants/Langs';
import customStyles from 'Operations/Operation/style/CategorySelect.style';
import { checkUpdateUser } from 'schema/checkField';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  language: '',
};

const defaultOptions = languages.map((lang) => ({
  value: lang,
  label: languageLabels[lang],
}));

const ProfileUpdate = () => {
  const [form, setForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formValidate, setFormValidate] = useState(false);
  const { data, loading } = useUser();
  const { updateUser, data: dataUser, loading: loadingUser } = useUpdateUser();
  const history = useHistory();

  useEffect(() => {
    if (data) {
      setForm({
        firstName: data.me.firstName,
        lastName: data.me.lastName,
        email: data.me.email,
        language: data.me.language,
      });
    }
  }, [data]);

  // check fields
  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    try {
      await checkUpdateUser.validateAt(name, form);
      setFormErrors({ ...formErrors, [name]: '' });
      setFormValidate(await checkUpdateUser.isValid(form));
    } catch (err) {
      setFormErrors({ ...formErrors, [name]: err.message });
      setFormValidate(await checkUpdateUser.isValid(form));
    }
  };

  // handle inputs
  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value.trim(),
    });
  };

  const handleLanguage = async (lang: any) => {
    setForm({
      ...form,
      language: lang.value,
    });
    setFormValidate(await checkUpdateUser.isValid(form));
  };

  const handleUpdateUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (formValidate) {
        await updateUser({
          variables: {
            ...form,
          },
        });
        toast.success('User updated successfully.', {
          position: toast.POSITION.BOTTOM_LEFT,
          draggable: false,
        });
        history.push('/');
      } else {
        throw new Error('Invalid form!');
      }
    } catch (err) {
      toast.error(err.message, { position: toast.POSITION.BOTTOM_LEFT, draggable: false });
    }
  };

  return (
    <Page>
      <PageHeader>
        <Header margin="auto" as="h3">
          Update Profile
        </Header>
      </PageHeader>
      <PageBody>
        <Flex justifyContent="center">
          {loading && <LoadingSpinner />}
          {data?.me && (
            <Form>
              <InputGroup>
                <InputControl message={formErrors.firstName} isInvalid={!!formErrors.firstName}>
                  <Input
                    onChange={handleInput}
                    onBlur={handleBlur}
                    value={form.firstName}
                    name="firstName"
                    placeholder="First name"
                  />
                </InputControl>
                <InputControl message={formErrors.lastName} isInvalid={!!formErrors.lastName}>
                  <Input
                    onChange={handleInput}
                    onBlur={handleBlur}
                    value={form.lastName}
                    name="lastName"
                    placeholder="Last Name"
                  />
                </InputControl>
              </InputGroup>
              <InputControl message={formErrors.email} isInvalid={!!formErrors.email}>
                <Input
                  onChange={handleInput}
                  onBlur={handleBlur}
                  value={form.email}
                  name="email"
                  placeholder="email"
                />
              </InputControl>
              <InputControl>
                <AsyncCreatableSelect
                  name="language"
                  onChange={handleLanguage}
                  options={defaultOptions}
                  styles={customStyles}
                  defaultValue={{
                    value: data.me.language,
                    label: languageLabels[data.me.language],
                  }}
                ></AsyncCreatableSelect>
              </InputControl>
              <Flex justifyContent="flex-end">
                <Button
                  onClick={(event) => handleUpdateUser(event)}
                  disabled={!formValidate || loadingUser}
                  variation="primary"
                  type="submit"
                >
                  {loadingUser ? 'Updating...' : 'Update'}
                </Button>
              </Flex>
            </Form>
          )}
        </Flex>
      </PageBody>
    </Page>
  );
};

export default ProfileUpdate;
