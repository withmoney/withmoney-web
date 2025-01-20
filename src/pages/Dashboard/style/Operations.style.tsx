export const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col flex-grow h-screen bg-[var(--page-background-color)]">
    {children}
  </div>
);

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-grow mt-[15px] relative">{children}</div>
);
