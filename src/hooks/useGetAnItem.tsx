import { useState, useEffect } from "react";
import { Item } from "../types/type";

type Props = {
  itemId: number;
  onFetchComplete?: (isComplete:boolean) => void;
};

const useGetAnItem = (props: Props) => {
  const [itemData, setItemData] = useState<any>();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  useEffect(() => {
    if (!props.itemId) return;
    fetch(`http://localhost:50000/getItemData/${props.itemId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setItemData(data);
        setIsComplete(true);
        props.onFetchComplete?.(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [props.itemId]);

  return { itemData, isComplete };
};

export default useGetAnItem;
