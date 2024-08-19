import { useState, createContext, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <AppContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </AppContext.Provider>
  );
};
