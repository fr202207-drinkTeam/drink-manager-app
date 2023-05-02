import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FC, memo } from "react";
import ItemCard from "../card/ItemCard";
import { MenuItem, Select, Typography } from "@mui/material";
import type { Items } from "../../types/type";
import Paginate from "../atoms/paginate/Paginate";
import Box from "@mui/material/Box";
import { ActivePinkButton, ActiveBlueButton, ActiveDarkBlueButton } from "../atoms/button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";

type Props = {};

const ItemSearch: FC<Props> = memo((props) => {

  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [item, setItem] = useState<Items[]>();
  const [allCategoryItem, setAllCategoryItem] = useState<Items[]>();
  const [selectedValue, setSelectedValue] = useState("popular");


  const handlePullDown = async(event:any) => {
    const value = event.target.value;
    setSelectedValue(value);
   
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("sort", encodeURIComponent(value));
      navigate(`${location.pathname}?${searchParams}`);
    
      try {
        const params = {
          itemCategory: category === "all" ? undefined : category,
          name_like:keyword,
          
      };
      const query = queryString.stringify(params, {skipNull: true});
        // 名前順　２ページ目以降ができない
        const response = await fetch(
          `http://localhost:8880/items?_sort=name&_order=asc&_page=${currentPage}&_limit=${perPage}&${query}`
        );

        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
   
    console.log(searchParams,"searchParams")
  };

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const keyword = queryParams.get("keyword");


  const perPage = 6;
  let currentPage = 1;
console.log(item,"item")
console.log(allCategoryItem,"allitem")

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
  // ワード検索
  useEffect(() => {
    const searchWordFilterData = async () => {
      try {
        if (location.search.includes("keyword")) {
          const keyword = new URLSearchParams(location.search).get("keyword");
          let url = `http://localhost:8880/items?_page=${currentPage}&_limit=${perPage}&name_like=${keyword}`;
          const response = await fetch(url);
          const data = await response.json();
          setItem(data);
          
        }
      } catch (error) {
        console.error(error);
      }
    };
    searchWordFilterData();
  }, [location.search, currentPage, setItem, perPage,keyword]);
  // ページングを押下ときのイベント
    const handlePageChange = async (
      event: React.SyntheticEvent,
      newValue: string
    ) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('page', newValue);
  
      try {
        const params = {
          itemCategory: category === "all" ? undefined : category,
          name_like: keyword,
        };
        const query = queryString.stringify(params, { skipNull: true });
        let url = `http://localhost:8880/items?_sort=name&_order=asc&_page=${newValue}&_limit=6&${query}`;
        navigate(`/home/search?${queryParams.toString()}`);
        const res = await fetch(url);
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    }
  // カテゴリごとの全件数の取得 //
// パラメータにcategoryとkeywordの指定があったらフィルタリングして件数を割り出す
useEffect(() => {
  const categoryData = async () => {
      try {
          const params = {
              itemCategory: category === "all" ? undefined : category,
              name_like:keyword,
              
          };
          const query = queryString.stringify(params, {skipNull: true});

          let url = `http://localhost:8880/items?&${query}`;
          const res = await fetch(url);
          const data = await res.json();
          setAllCategoryItem(data);
      } catch (error) {
          console.error(error);
      }
  }
  categoryData();
}, [category, keyword]);


  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <ActivePinkButton event={onNameAscClick}>人気順</ActivePinkButton>
        <ActiveBlueButton event={onNameAscClick}>名前順</ActiveBlueButton> */}
         <Select
      size="small"
      value={selectedValue}
      sx={{ border: "none", backgroundColor: "white" }}
      onChange={handlePullDown}
    >
      <MenuItem value="popular">人気順</MenuItem>
      <MenuItem value="name">名前順</MenuItem>
      <MenuItem value="社内あり">社内あり</MenuItem>
    </Select>
      </Box>
      {keyword ?
         <Typography>{keyword}の検索結果一覧</Typography>
      :""}
      
      {item  ? (
  <>
    <Typography>検索結果：{allCategoryItem?.length}件</Typography>
    {item && <ItemCard data={item} />}
    {item?.length>0 &&
    <Paginate
      // ページング数
      count={allCategoryItem && Math.ceil(allCategoryItem?.length / perPage)}
      onChange={handlePageChange}
      // 現在のページ
      page={Number(searchParams.get("page"))}
    />}
  </>
) : (
  "該当する商品がありません"
)}
    </>
  );
});

export default ItemSearch;
