import { useState, useEffect } from "react";

type Props = {
  itemId: number
};

const useGetAnItem = (props: Props) => {
  const [itemData, setItemData] = useState<any>()
  
  useEffect(() => {
    if (!props.itemId) return;
    fetch(`http://localhost:8880/items?id=${props.itemId}`, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setItemData(data[0])
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [props.itemId])

  return itemData
}

export default useGetAnItem
