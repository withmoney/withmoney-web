import Link from 'components/Link';
import { AttachMoney as IconMoney } from '@styled-icons/material';
import { BarGraph } from '@styled-icons/entypo';
import { UserAccount } from '@styled-icons/boxicons-solid';
import { Category } from '@styled-icons/boxicons-solid';
import { CreditCardFill } from '@styled-icons/bootstrap';

export const Money = () => (
  <IconMoney className="w-[30px] mr-[10px] text-[var(--icon-default-color)]" />
);

export const Accounts = () => (
  <UserAccount className="w-[30px] mr-[10px] text-[var(--icon-default-color)]" />
);

export const Categories = () => (
  <Category className="w-[30px] mr-[10px] text-[var(--icon-default-color)]" />
);

export const CreditCard = () => (
  <CreditCardFill className="w-[30px] mr-[10px] text-[var(--icon-default-color)]" />
);

export const Graph = () => (
  <BarGraph className="w-[30px] mr-[10px] text-[var(--icon-default-color)]" />
);

export const MenuContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col bg-[var(--dashboard-color-white)] pt-[20px] pb-[20px] border-b-2 border-[var(--dashboard-border-color)]">
    {children}
  </div>
);

export const MenuSettings = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col bg-[var(--dashboard-color-white)] pb-[20px]">{children}</div>
);

type ButtonProps = {
  open?: boolean;
  children: React.ReactNode;
  to: string;
};

export const MenuButton = ({ open, children, ...props }: ButtonProps) => (
  <Link
    {...props}
    className={`flex items-center no-underline p-[10px_20px] cursor-pointer ${
      open ? 'bg-[var(--dashboard-button-color-hover)]' : 'bg-[var(--dashboard-color-white)]'
    } hover:bg-[var(--dashboard-button-color-hover)] active:bg-[var(--dashboard-button-color-active)]`}
  >
    {children}
  </Link>
);

export const TextContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start p-[10px_20px]">{children}</div>
);
