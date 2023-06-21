type Props = {
  itemName: String;
};

// 引数で商品名を受け取り、重複チェックをしてbooleanで返す
const CheckForDuplicates = async (props: Props) => {
  let isPassed = false
  await fetch(`http://localhost:50000/itemName/${props.itemName}`, { method: "GET" })
  .then((res) => res.json())
  .then((data) => {
    if(data.length === 0) {
        isPassed = true
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  return isPassed;
};

export default CheckForDuplicates;
