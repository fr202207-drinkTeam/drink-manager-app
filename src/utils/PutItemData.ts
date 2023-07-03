type Props = {
    id: number,
    itemName: string;
    description: string;
    itemCategory: number;
    inTheOffice: boolean;
    approval: boolean;
    author: number | null;
    isDiscontinued: boolean;
    // images: { create: { imagePath: string | unknown; }[]; };
    images: {imagePath: string | unknown}[]
};

// 引数で商品情報(data)を受け取り、成功有無を返す
const PutItemData = async (props: Props) => {
  let success = false;
  await fetch(`http://localhost:50000/itemedit/${props.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  })
  .then((res) => {
    if (res.ok) {
      success = true;
    }
    return res.json();
  })
  .catch((error) => {
    console.error("Error:", error);
    success = false;
  });

    return success;
};

export default PutItemData;
