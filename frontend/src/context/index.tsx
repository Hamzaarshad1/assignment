import React, { createContext, Dispatch, useEffect, useState } from 'react';
import { ReactNode } from 'react';

export type passenger = {
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  street: string;
  zipcode: string;
  email: string;
  phone: string;
};

export type ContextType = {
  data: passenger[];
  setData: Dispatch<React.SetStateAction<passenger[]>>;
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<React.SetStateAction<string>>;
};

const defaultContextValue: ContextType = {
  data: [],
  setData: () => {},
  loading: false,
  setLoading: () => {},
  error: '',
  setError: () => {},
};

export const DataContext = createContext<ContextType>(defaultContextValue);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<passenger[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  return (
    <DataContext.Provider
      value={{ data, setData, error, setError, loading, setLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};
