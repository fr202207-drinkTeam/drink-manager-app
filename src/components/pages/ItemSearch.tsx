import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FC, memo } from "react";
import ItemCard from "../card/ItemCard";
import { Typography } from "@mui/material";
import type { Items } from "../../types/type";
import Paginate from "../atoms/paginate/Paginate";
import Box from "@mui/material/Box";
import { ActivePinkButton, ActiveBlueButton } from "../atoms/button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
type Props = {};

const ItemSearch: FC<Props> = memo((props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [item, setItem] = useState<any>();
  const [allCategoryItem, setAllCategoryItem] = useState<any>();

  console.log("ページ", page);

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  console.log(location.pathname, "pathname");
  const perPage = 6;
  let currentPage = 1;

  // カテゴリタブを押したときの初期データ
  useEffect(() => {
    const categoryFilterData = async () => {
      try {
        let url = `http://localhost:8880/items?_page=${currentPage}&_limit=${perPage}`;
        if (category !== "all") {
          url += `&itemCategory=${category}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (category === "all") {
          setItem(data);
        } else {
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
  // ページングを押下ときのイベント
  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    navigate(`/home/search?category=${category}&page=${newValue}`);
    console.log(newValue, "newValue");
    try {
      let url = `http://localhost:8880/items?_page=${newValue}&_limit=${perPage}`;
      if (category !== "all") {
        url += `&itemCategory=${category}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (category === "all") {
        setItem(data);
      } else {
        const filteredData = data.filter(
          (item: any) => item.itemCategory === Number(category)
        );
        setItem(filteredData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // カテゴリごとの全件数の取得
  useEffect(() => {
    const categoryData = async () => {
      try {
        let url = `http://localhost:8880/items?`;
        if (category !== "all") {
          url += `&itemCategory=${category}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (category === "all") {
          setAllCategoryItem(data);
        } else {
          const filteredData = data.filter(
            (item: any) => item.itemCategory === Number(category)
          );
          setAllCategoryItem(filteredData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    categoryData();
  }, [category]);
  console.log(allCategoryItem, "all");
  // 名前順並べ替え
  const handleButtonClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8880/items?_sort=name&_order=asc`
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ActivePinkButton event={handleButtonClick}>人気順</ActivePinkButton>
        <ActiveBlueButton event={handleButtonClick}>名前順</ActiveBlueButton>
      </Box>
      <Typography>検索結果：{allCategoryItem?.length}件</Typography>
      <ItemCard data={item} />
      <Paginate
        // ページング数
        count={Math.ceil(allCategoryItem?.length / perPage)}
        onChange={handleChange}
        // 現在のページ
        page={Number(searchParams.get("page"))}
      />
    </>
  );
});

export default ItemSearch;
