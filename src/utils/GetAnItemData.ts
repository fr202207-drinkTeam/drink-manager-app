import { useState, useEffect } from "react";

type Props = {
  itemId: number;
};

const GetAnItemData = (props: Props) => {
  let itemData
  let getSuccess = false
    if (!props.itemId) return;
    
    fetch(`http://localhost:50000/getItemData/${props.itemId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        itemData = data
        getSuccess = true
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  return { itemData, getSuccess };
};

export default GetAnItemData;
