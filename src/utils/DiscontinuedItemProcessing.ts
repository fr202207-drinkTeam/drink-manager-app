type Props = {
    itemId: number
};

// 引数でitemIdを受け取り、成功有無を返す
const DiscontinuedItemProcessing = async (props: Props) => {
  let success = false;
  await fetch(`http://localhost:50000/discontinuedItem/${props.itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({

    }),
  })
    .then(response => response.json())
  .then(result => {
    console.log(result)
    success = true
  })
  .catch(error => {
    console.error(error);
  });

    return success;
};

export default DiscontinuedItemProcessing;
