import { useState, useEffect } from 'react';

export const fetchHook = <T>(method: string, slug: string, body?: BodyInit, headers?: HeadersInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const apiRequest = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      if (body) {
        headers = {
          ...headers,
          'Content-Type': 'application/json',
        };
      }

      const reqParams = {
        method,
        body,
        headers,
      };

      const response = await fetch(`${baseUrl}${slug}`, reqParams);

      const data = await response.json();
      console.log(data);

      // if (!data.success) {
      //     setLoading(false);
      //     throw new Error('No data!');
      // }

      // if (data.success) {
      //     setData(data);
      // }
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    apiRequest();
  }, []);

  return { loading, error, data, apiRequest };
};
