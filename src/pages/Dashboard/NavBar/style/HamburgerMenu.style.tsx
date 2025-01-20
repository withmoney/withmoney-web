import { Menu as MenuIcon } from '@styled-icons/material';
import { classNames } from 'utils/classNames';

type PropsMenu = {
  active: boolean;
  onClick?: () => void;
  title?: string;
};

export const Menu = ({ active, ...props }: PropsMenu) => (
  <MenuIcon
    className={classNames(
      'm-0 mx-[15px] p-[5px] w-[var(--dashboard-icon-size)] text-[var(--dashboard-icon-color)] rounded-full cursor-pointer',
      active ? 'bg-[var(--dashboard-color-white)]' : 'bg-[var(--dashboard-color-lightgrey)]',
      'hover:bg-[var(--dashboard-color-lightgrey)] active:bg-[var(--dashboard-color-grey)] active:shadow-[0px_0px_0px_2px_rgba(50,115,220,0.25)]',
    )}
    {...props}
  />
);

export const MeuButton = (props: { children: React.ReactNode }) => (
  <button
    className={classNames('bg-[var(--dashboard-color-white)] p-0 outline-none border-none')}
    {...props}
  />
);

type MenuContainerProps = {
  isSidebarOpen: boolean;
  children: React.ReactNode;
};

export const MenuContainer = ({ isSidebarOpen, children }: MenuContainerProps) => (
  <div
    className={classNames(
      'transition-[width] duration-200 ease-out flex items-center bg-[var(--dashboard-color-white)] border-r-2 border-[var(--dashboard-border-color)]',
      isSidebarOpen ? 'w-[300px]' : 'w-[71px]',
    )}
  >
    {children}
  </div>
);
