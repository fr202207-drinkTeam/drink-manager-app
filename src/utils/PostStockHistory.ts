import type { StockHistory } from "../types/type";

// 引数で商品情報(data)を受け取り、成功有無を返す
const PostStockHistory = async (props: StockHistory[]) => {
  let success = false;
  await fetch("http://localhost:50000/addstockhistory", {
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
      if (error) {
        success = true;
      }
    });

    return success;
};

export default PostStockHistory;
