type Props = {
    itemName: string;
    description: string;
    itemCategory: number;
    inTheOffice: boolean;
    approval: boolean;
    author: number | null;
    pollItem: boolean;
    isDiscontinued: boolean;
    images: { imagePath: string | unknown }[];
};

// 引数で商品情報(data)を受け取り、成功有無を返す
const PostItemData = async (props: Props) => {
  let success = false;
  await fetch("http://localhost:50000/additem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  })
    .then((res) => res.json())
    .then(() => {
      success = true;
    })
    .catch((error) => {
      console.error("Error:", error);
      success = false
    });

    return success;
};

export default PostItemData;
