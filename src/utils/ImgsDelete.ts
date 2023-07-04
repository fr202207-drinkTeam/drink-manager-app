// 引数で画像のid配列を受け取り成功有無を返す
const ImgsDelete = async (props: number) => {
  let success = false;
  await fetch(`http://localhost:50000/itemimagesdelete/${props}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => {
      success = true;
    })
    .catch((error) => {
      console.error("Error:", error);
      success = false;
    });

  return success;
};

export default ImgsDelete;
