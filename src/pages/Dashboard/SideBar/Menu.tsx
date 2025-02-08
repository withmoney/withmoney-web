import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Text from 'components/Text';

import { MenuContainer, MenuButton, Money, Graph } from './style/Menu.style';
import { CloudUpload } from '@styled-icons/boxicons-solid/CloudUpload';

const Menu = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation('menu');
  return (
    <MenuContainer>
      <MenuButton open={pathname === '/dashboard'} to="/dashboard">
        <Money />
        <Text>{t('operations')}</Text>
      </MenuButton>
      <MenuButton open={pathname.slice(0, 8) === '/reports'} to="/reports">
        <Graph />
        <Text>{t('reports')}</Text>
      </MenuButton>
      <MenuButton open={pathname.slice(0, 8) === '/import'} to="/import">
        <CloudUpload className="w-[30px] mr-[10px] text-[var(--icon-default-color)]" />
        <Text>{t('import')}</Text>
      </MenuButton>
    </MenuContainer>
  );
};

export default Menu;
