import { useState, useEffect } from "react";
import { Items } from "../types/type";
//アイテムを全て取得
//レンダリングさせるためにtrigger置いてます。使用先でState(const[trigger,settrigger]=useState(false);)を使用し
//トリガーとしたい場所に「setTrigger(!trigger)」を設置してください
const useGetAllItem = (trigger: boolean) => {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:50000/items`);//API書き換え
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