import React, { createContext, useContext, useEffect, useState } from 'react';
import useBreakpoint from './useBreakpoint';

type Props = {
  children: React.ReactNode;
};

interface SidebarContext {
  isSidebarOpen: boolean;
  toggleSidebar?: () => void;
}

const isSidebarOpenContext = createContext<SidebarContext>({
  isSidebarOpen: localStorage.getItem('isSidebarClose') === 'false',
});

export default function SidebarProvider({ children }: Props) {
  const [isSidebarOpen, setSidebarVisibility] = useState(
    localStorage.getItem('isSidebarClose') === 'false' ||
      localStorage.getItem('isSidebarClose') === null,
  );

  const { isBase } = useBreakpoint();

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarOpen);
    localStorage.setItem('isSidebarClose', JSON.stringify(isSidebarOpen));
  };

  useEffect(() => {
    if (isBase) {
      setSidebarVisibility(false);
    }
  }, [isBase]);

  return (
    <isSidebarOpenContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </isSidebarOpenContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebarCollapse() {
  const context = useContext(isSidebarOpenContext);
  const { isSidebarOpen, toggleSidebar } = context;
  return { isSidebarOpen, toggleSidebar };
}
