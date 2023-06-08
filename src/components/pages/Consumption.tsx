import { Box, CircularProgress, Paper, Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FC, memo, useEffect, useState } from "react";
import StockCard from "../organisms/card/StockCard";
import AdmTitleText from "../atoms/text/AdmTitleText";
import axios from "axios";
import { StockHistory } from "../../types/type";
import useGetItems from "../../hooks/useGetItems";
import ModalWindow from "../organisms/ModalWindow";

const Consumption: FC = memo(() => {
  const navigate = useNavigate();
  const { itemData, itemLoading, itemError } = useGetItems("?intheOffice=true");
  const [inputValueArr, setInputValueArr] = useState<number[]>([]);
  const [inputValueArrError, setInputValueArrError] = useState("");
  const [inputValueArrAllError, setInputValueArrAllError] = useState("");

  useEffect(() => {
    const firstInputValueArr: number[] = [...Array(itemData.length)].map(
      () => 0
    );
    setInputValueArr(firstInputValueArr);
  }, [itemData]);

  //オフィスに存在する商品のidのみが格納された配列
  const [inTheOfficeItemIdArr, setInTheOfficeItemIdArr] = useState<
    Array<number>
  >([]);

  useEffect(() => {
    setInTheOfficeItemIdArr(itemData.map((item: any) => item.id));
  }, [itemData]);

  //オフィスに存在する商品情報が格納された配列
  const [inTheOfficeItemArr, setInTheOfficeItemArr] = useState<
    Array<StockHistory>
  >([]);

  useEffect(() => {
    getStockAmount();
  }, [inTheOfficeItemIdArr]);

  //現在の在庫量を取得
  const getStockAmount = async () => {
    const promises = inTheOfficeItemIdArr.map((test) => {
      return axios
        .get(
          `http://localhost:8880/stockhistory?&itemId=${test}&_sort=day&_order=desc&_limit=1`
        )
        .then((res) => {
          return res.data[0];
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    });
    const newArr = await Promise.all(promises);
    setInTheOfficeItemArr(newArr);
  };

  const validateConsuption = () => {
    const invalidValues = inputValueArr.map((value, index) => {
      if (!inTheOfficeItemArr[index]) {
        if (value > 0) {
          return false;
        } else {
          return true;
        }
      } else {
        if (value > inTheOfficeItemArr[index]?.stockAmount) {
          return false;
        } else {
          return true;
        }
      }
    });

    const invalidAllValues = inputValueArr.filter(
      (value, index) => value === 0
    );
    if (invalidValues.includes(false)) {
      setInputValueArrError("*入力した数値が在庫数を上回っています");
      return false;
    }
    if (invalidAllValues.length === inputValueArr.length) {
      setInputValueArrError("*入力をしてください");
      return false;
    }
    setInputValueArrError("");
    return true;
  };

  const onClickSubmit = async () => {
    const isAdditionValid = validateConsuption();
    if (isAdditionValid) {
      const now = new Date();
      const dateString = now.toISOString();
      try {
        await Promise.all(
          itemData.map(async (item, index) => {
            let newStockAmount;
            if (inTheOfficeItemArr[index].stockAmount > 0) {
              newStockAmount =
                inTheOfficeItemArr[index].stockAmount - inputValueArr[index];
              if (inputValueArr[index] > 0) {
                await axios.post("http://localhost:8880/stockhistory", {
                  itemId: item.id,
                  quantity: inputValueArr[index],
                  day: dateString,
                  incOrDec: false,
                  stockAmount: newStockAmount,
                });
                navigate("/adminhome");
              }
            }
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Paper
      sx={{
        mb: 5,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: "30px",
      }}
    >
      <Box id="top" />
        <AdmTitleText>消費在庫入力</AdmTitleText>
      {itemError ? (
        <Alert severity="error" sx={{ marginTop: "30px", fontSize: "20px" }}>
          <AlertTitle>Error</AlertTitle>
          データが見つかりませんでした。
        </Alert>
      ) : itemLoading ? (
        <CircularProgress sx={{ marginTop: "30px", marginBottom: "40px" }} />
      ) : (
        <StockCard
          itemData={itemData}
          inTheOfficeItemArr={inTheOfficeItemArr}
          inputValueArr={inputValueArr}
          setInputValueArr={setInputValueArr}
        />
      )}
      <div style={{ display: "inline-flex" }}></div>
      <ModalWindow
        title="送信します、よろしいですか？"
        content={""}
        openButtonColor="blue"
        buttonName="送信"
        completeButtonColor={"blue"}
        completeButtonName={`はい`}
        completeAction={onClickSubmit}
        cancelButtonColor={"red"}
        openButtonSxStyle={{
          my: "50px",
          py: "10px",
          px: "30px",
          fontSize: {xs: "14px", sm: "16px", md: "20px", lg: "20px"},
          borderRadius: 3,
        }}
      />
      {inputValueArrError && (
        <Box sx={{ color: "red", fontSize: 15, marginBottom: 1, mt: 1 }}>
          {inputValueArrError}
        </Box>
      )}
      {inputValueArrAllError && (
        <Box sx={{ color: "red", fontSize: 15, marginBottom: 1, mt: 1 }}>
          {inputValueArrAllError}
        </Box>
      )}
    </Paper>
  );
});

export default Consumption;
