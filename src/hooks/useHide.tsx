import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const HideContext = createContext('');

export default function HideProvider({ children }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [hideSideBar, setHideSideBar] = useState(false);
  return (
    <HideContext.Provider
      /*@ts-ignore */
      value={{
        hideSideBar,
        setHideSideBar,
        showMenu,
        setShowMenu,
      }}
    >
      {children}
    </HideContext.Provider>
  );
}

export function useHide() {
  const context = useContext(HideContext);
  /*@ts-ignore */
  const { hideSideBar, setHideSideBar, showMenu, setShowMenu } = context;
  return { hideSideBar, setHideSideBar, showMenu, setShowMenu };
}
