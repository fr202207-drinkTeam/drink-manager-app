import { useState, useEffect } from "react";
import { Items } from "../types/type";


const useGetAllItem = (trigger: boolean) => {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8880/items`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [trigger]);

  return items;
};

export default useGetAllItem;