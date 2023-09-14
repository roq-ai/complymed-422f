import { useState, useEffect, useMemo, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const useAxiosFetch = (url: string, options: AxiosRequestConfig<any> = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const optionsRef = useRef(options); // Use a ref to store the options object

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!url) {
        return;
      }
      setIsLoading(true);

      try {
        const response = await axios(url, optionsRef.current);

        if (isMounted) {
          setData(response.data);
          setError(null);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  // Update the optionsRef whenever options change
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return { data, isLoading, error };
};

export default useAxiosFetch;
