type Props = {
  itemId: number;
};

const GetAnItemData = async(props: Props) => {    
    return await fetch(`http://localhost:50000/getItemData/${props.itemId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
};

export default GetAnItemData;
