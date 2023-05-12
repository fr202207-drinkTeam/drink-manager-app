import { useState, useEffect } from "react";
import { Items } from "../types/type";


const useGetAllItem = () => {
  const [items, setItems] = useState<Items[]>([]);
 //Items取得
useEffect(() => {
  (async () => {
    try {
      const response = await fetch(`http://localhost:8880/items`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  })();
}, []);
  return items;
};

export default useGetAllItem;