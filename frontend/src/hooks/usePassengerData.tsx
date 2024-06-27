import { useCallback, useEffect } from 'react';
import { ContextType } from '../context';
import { getAllPassengers } from '../service/passenger.service';
import { useContextHook } from './useContext';

export const usePassengerData = (): ContextType => {
  const { data, setData, setLoading, setError } = useContextHook();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const result = await getAllPassengers();
        setData(result);
      } catch (error) {
        console.error('Error fetching passenger:', error);
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setData, setLoading, setError]);

  return { data, setData, loading: false, setLoading, error: '', setError };
};
