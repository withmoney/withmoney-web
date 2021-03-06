import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarOpen);
    localStorage.setItem('isSidebarClose', JSON.stringify(isSidebarOpen));
  };

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

export function useSidebarCollapse() {
  const context = useContext(isSidebarOpenContext);
  const { isSidebarOpen, toggleSidebar } = context;
  return { isSidebarOpen, toggleSidebar };
}
