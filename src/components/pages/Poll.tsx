import { Paper } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import PollCard from "../card/PollCard";
import { Items } from "../../types/type";
import ItemCard from "../card/ItemCard";

type Props = {};

const Poll: FC<Props> = memo((props) => {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/items`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  console.log(items)

  return (
    <>
      <Paper>
        <PollCard data={items} />
        <ItemCard data={items} />
      </Paper>
    </>
  );
});

export default Poll;
