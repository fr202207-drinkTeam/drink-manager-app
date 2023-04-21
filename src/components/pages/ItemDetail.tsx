import { FC, memo } from "react";
import { useState } from "react";
import useGetAnItem from "../../hooks/useGetAnItem";
import useGetOfficeItems from "../../hooks/useGetOfficeItems";

type Props = {
  // itemId: number
  intheOffice: boolean
};

const ItemDetail: FC<Props> = memo((props) => {
  // const itemData = useGetAnItem({ itemId: 1 })
  const officeItemData = useGetOfficeItems(props)
  console.log(officeItemData)
  if (!officeItemData) return <div>Loading...</div>;
  return (
    <>
    {!officeItemData ? (
      <div>Loading...</div>
    ) : (
      <div>
    <p>商品詳細</p>
    <p>ID: {officeItemData[2].id}</p>
        <p>Name: {officeItemData[2].name}</p>
        <p>Description: {officeItemData[2].description}</p>
        <p>Category: {officeItemData[2].itemCategory}</p>
      </div>
    )}
    
    </>
  )
});

export default ItemDetail;
