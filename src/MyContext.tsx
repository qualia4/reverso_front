import React, { createContext, useContext } from "react";

interface MyContextProps {
  jsonData: Record<string, string>; // Enforce jsonData to be an object with string values
  updateJsonData: (newJsonData: Record<string, string>) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyProviderProps {
  children: React.ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [jsonData, setJsonData] = React.useState<Record<string, string>>({});

  const updateJsonData = (newJsonData: Record<string, string>) => {
    setJsonData(newJsonData);
  };

  return (
    <MyContext.Provider value={{ jsonData, updateJsonData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
