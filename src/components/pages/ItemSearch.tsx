import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FC, memo } from "react";
import ItemCard from "../card/ItemCard";
import { Typography } from "@mui/material";
import type { Items } from "../../types/type";
import Paginate from "../atoms/paginate/Paginate";
import Box from "@mui/material/Box";
import { ActivePinkButton, ActiveBlueButton } from "../atoms/button/Button";
type Props = {};

const ItemSearch: FC<Props> = memo((props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const [item, setItem] = useState<any>();
  console.log(category, "category");

  console.log(location.pathname, "pathname");
  useEffect(() => {
    const categoryFilterData = async () => {
      try {
        const response = await fetch(`http://localhost:8880/items`);
        const data = await response.json();
        // ?category=allで全件取得
        if (category === "all") {
          setItem(data);
          //コーヒーの種類すべて(categoryIdが1~4)取得
        } else if (category === "allcoffee") {
          const filteredCoffeeDate = data.filter(
            (item: any) => item.itemCategory >= 1 && item.itemCategory <= 4
          );
          console.log(filteredCoffeeDate, "filteredCategory");
          setItem(filteredCoffeeDate);
        } else if (category) {
          // categoryIdが一致したもののみ取得
          const filteredData = data.filter(
            (item: any) => item.itemCategory === Number(category)
          );
          setItem(filteredData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    categoryFilterData();
  }, [category]);
  const handleButtonClick = () => {};
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ActivePinkButton event={handleButtonClick}>人気順</ActivePinkButton>
        <ActiveBlueButton event={handleButtonClick}>名前順</ActiveBlueButton>
      </Box>
      <Typography>検索結果：{item?.length}件</Typography>
      <ItemCard data={item} />
      <Paginate />
    </>
  );
});

export default ItemSearch;
