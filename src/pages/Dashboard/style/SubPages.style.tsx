import React from 'react';

export const Content = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center">{children}</div>
);

export const PageHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-between p-[18px_44px] bg-[#e4e4e4]">{children}</div>
);

export const PageBody = ({ children }: { children: React.ReactNode }) => (
  <div className="p-[35px] bg-white">{children}</div>
);

export const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white h-full">{children}</div>
);

export const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-[45px] p-[13px] items-center justify-between">{children}</div>
);

type CellProps = {
  align?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  children: React.ReactNode;
};

export const Cell = ({ align = 'center', children }: CellProps) => (
  <span
    className={`flex justify-${align} ${
      align ? 'p-[30px]' : 'p-0'
    } min-w-[150px] first:justify-start first:w-full`}
  >
    {children}
  </span>
);

export const PageBodyColumns = ({ children }: { children: React.ReactNode }) => (
  <div className="p-[35px] bg-white">
    {React.Children.map(children, (child, index) => (
      <div className={index % 2 === 1 ? 'bg-[rgb(244,244,244)]' : undefined}>{child}</div>
    ))}
  </div>
);
