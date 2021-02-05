import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

interface SidebarContext {
  isSidebarOpen: boolean;
  toggleSidebar?: () => void;
}

const isSidebarOpenContext = createContext<SidebarContext>({
  isSidebarOpen: localStorage.getItem('sidebarCollapse') === 'true',
});

export default function SidebarProvider({ children }: Props) {
  !localStorage.getItem('sidebarCollapse') && localStorage.setItem('sidebarCollapse', 'true');
  const [isSidebarOpen, setSidebarVisibility] = useState(
    localStorage.getItem('sidebarCollapse') === 'true',
  );

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarOpen);
    localStorage.setItem('sidebarCollapse', JSON.stringify(!isSidebarOpen));
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
