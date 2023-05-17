import React from "react";
import { TextField } from "@mui/material";
import { ActiveOrangeButton } from "../atoms/button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PrimaryInput } from "../atoms/input/Input";
type Props = {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  searchResults: any;
  setSearchResults: React.Dispatch<React.SetStateAction<any>>;
};

const ItemSearchForm: React.FC<Props> = ({ searchWord, setSearchWord }) => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<any>([]);

  const onSearchButtonClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8880/items?_page=1&_limit=6&name_like=${searchWord}`
      );
      const data = await response.json();
      setSearchResults(data);
      // navigate(`/home/search?category=${category}&page=1`);
      navigate(`/home/search?keyword=${searchWord}&page=1`);
      setSearchWord("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchButtonClick();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          sx={{ my: 4, width: "100%", backgroundColor: "#fff" }}
          value={searchWord}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchWord(e.target.value);
          }}
          type="text"
        />
        <ActiveOrangeButton
          event={onSearchButtonClick}
          sxStyle={{ width: "100%" }}
        >
          検索する
        </ActiveOrangeButton>
      </form>
    </>
  );
};

export default ItemSearchForm;
