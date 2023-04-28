import React from "react";
import { TextField } from "@mui/material";
import { ActiveOrangeButton } from "../atoms/button/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
};

const ItemSearchForm: React.FC<Props> = ({ searchWord, setSearchWord }) => {
  const navigate = useNavigate();
  const onSearchButtonClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8880/items?name_like=${searchWord}`
      );
      const data = await response.json();
      console.log(data, "searchForm");
      // dataに絞り込んだ文字入ってくる
      navigate(`/home/search?keyword=${searchWord}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <TextField
        id="outlined-basic"
        variant="outlined"
        sx={{ my: 4, width: "100%", backgroundColor: "#fff" }}
        value={searchWord}
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        //   setSearchWord(e.target.value);
        // }}
      />
      <ActiveOrangeButton
        event={onSearchButtonClick}
        sxStyle={{ width: "100%" }}
      >
        検索する
      </ActiveOrangeButton>
    </>
  );
};

export default ItemSearchForm;
