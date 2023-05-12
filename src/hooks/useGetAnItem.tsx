import { useState, useEffect } from "react";

type Props = {
  itemId: number;
  onFetchComplete?: (isComplete:boolean) => void;
};

const useGetAnItem = (props: Props) => {
  const [itemData, setItemData] = useState<any>();
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    if (!props.itemId) return;
    fetch(`http://localhost:8880/items?id=${props.itemId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setItemData(data[0]);
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
