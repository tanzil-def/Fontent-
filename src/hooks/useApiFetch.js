import { useEffect, useState } from 'react';
import api from '../api';

const useApiFetch = (url, transformer = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    api
      .get(url)
      .then((res) => {
        const items = res.data?.data || [];
        const transformed = transformer
          ? items.map((item, index) => transformer(item, index))
          : items;
        if (isMounted) {
          setData(transformed);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(`❌ Fetch error for ${url}:`, err);
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useApiFetch;
