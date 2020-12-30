import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const SideHideContext = createContext({});

export default function SideHideProvider({ children }: Props) {
  const [sideHide, setSideHide] = useState(false);
  return (
    <SideHideContext.Provider
      value={{
        sideHide,
        setSideHide,
      }}
    >
      {children}
    </SideHideContext.Provider>
  );
}

export function useSideHide() {
  const context = useContext(SideHideContext);
  const { sideHide, setSideHide }: any = context;
  return { sideHide, setSideHide };
}
