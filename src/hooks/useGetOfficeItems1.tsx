import { useEffect, useState } from 'react';
import { Items } from '../types/type';
import axios from 'axios';

export const useGetOfficeItems1 = () => {
  const [itemData, setItemData] = useState<Array<Items>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8880/items?intheOffice=true')
      .then((res) => {
        setItemData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { itemData, loading, error };
};
