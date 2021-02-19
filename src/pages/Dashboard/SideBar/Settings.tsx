import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Text from 'components/Text';
import { Accounts, CreditCard, Categories } from './style/Menu.style';
import { MenuSettings, MenuButton, TextContainer } from './style/Menu.style';

const Settings = () => {
  const { t } = useTranslation('menu');
  const { pathname } = useLocation();

  return (
    <MenuSettings>
      <TextContainer>
        <Text>{t('settings')}</Text>
      </TextContainer>
      <MenuButton open={pathname === '/accounts'} to="/accounts">
        <Accounts />
        <Text>{t('accounts')}</Text>
      </MenuButton>
      <MenuButton open={pathname === '/categories'} to="/categories">
        <Categories />
        <Text>{t('categories')}</Text>
      </MenuButton>
      <MenuButton open={pathname === '/credit-cards'} to="/credit-cards">
        <CreditCard />
        <Text>{t('creditCards')}</Text>
      </MenuButton>
    </MenuSettings>
  );
};

export default Settings;
