import { Box, CircularProgress, Paper, Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FC, memo, useEffect, useState } from "react";
// import { useGetOfficeItems1 } from '../../hooks/useGetOfficeItems1';
import StockCard from "../organisms/card/StockCard";
import AdmTitleText from "../atoms/text/AdmTitleText";
import axios from "axios";
import { StockHistory } from "../../types/type";
import useGetItems from "../../hooks/useGetItems";
import ModalWindow from "../organisms/ModalWindow";

type Props = {};

const Consumption: FC<Props> = memo((props) => {
  const navigate = useNavigate();
  // const { itemData, loading, error } = useGetOfficeItems1();
  const { itemData, itemLoading, itemError } = useGetItems("?intheOffice=true");
  const [inputValueArr, setInputValueArr] = useState<number[]>([]);
  const [inputValueArrError, setInputValueArrError] = useState("");
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

  // ここがgetできていない
  //現在の在庫量を取得
  const getStockAmount = async () => {
    const promises = inTheOfficeItemIdArr?.map((test) => {
      return axios
        .get(
          `http://localhost:8880/stockhistory?&itemId=${test}&_sort=id&_order=desc&_limit=1`
        )
        .then((res) => {
          return res?.data[0];
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
    const invalidValues = inputValueArr.filter((value, index) =>  value > inTheOfficeItemArr[index]?.stockAmount);
    const invalidAllValues = inputValueArr.filter((value, index) => value === 0 );
    if (invalidValues.length > 0) {
      setInputValueArrError("*入力内容の確認をしてください");
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
            await axios.post('http://localhost:8880/stockhistory', {
              itemId: item.id,
              quantity: inputValueArr[index],
              day: dateString,
              incOrDec: true,
              stockAmount:
                inTheOfficeItemArr[index].stockAmount - inputValueArr[index],
            });
          })
        );

        // 処理が全て完了した後に/adminhomeへ遷移
        navigate('/adminhome');
        // await restartJsonServer();
      } catch (error) {
        console.log(error);
      }
    } else {
      setInputValueArrError("*入力内容の確認をしてください");
    }
  };

  return (
    <Paper
      sx={{
        mb: 5,
        width: "100%",
        minWidth: 500,
        maxWidth: 1200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "30px",
      }}
    >
      <Box id="top" />
      <Box sx={{ width: "60%", p: "30px" }}>
        <AdmTitleText>消費在庫入力</AdmTitleText>
      </Box>
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
          py: "18px",
          px: "60px",
          fontSize: "20px",
          borderRadius: 10,
        }}
      />
      {inputValueArrError && (
        <Box sx={{ color: "red", fontSize: 15, marginBottom: 1, mt: 1 }}>
          {inputValueArrError}
        </Box>
      )}
    </Paper>
  );
});

export default Consumption;


  //送信ボタン押下後の処理
  // const onClickSubmit = async () => {
  //   const now = new Date();
  //   const dateString = now.toISOString();
  //   console.log('送信しました。');
  //   let i = 0;
  //   try {
  //     for (const item of itemData) {
  //       await axios.post('http://localhost:8880/stockhistory', {
  //         itemId: item.id,
  //         quantity: inputValueArr[i],
  //         day: dateString,
  //         incOrDec: true,
  //         stockAmount: inTheOfficeItemArr[i].stockAmount + inputValueArr[i],
  //       });
  //       i++;
  //     }
  //     console.log('Data submitted successfully');
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   // 処理が全て完了した後に/adminhomeへ遷移
  //   navigate('/adminhome');
  // };
