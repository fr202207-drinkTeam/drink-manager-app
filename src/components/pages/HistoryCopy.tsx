import {
  Box,
  Card,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import useGetItems from "../../hooks/useGetAnItems";
import { Items } from "../../types/type";
import { ActiveDarkBlueButton } from "../atoms/button/Button";
import { SecondaryInput } from "../atoms/input/Input";
import AdmTitleText from "../atoms/text/AdmTitleText";

type Props = {
  itemId: number;
  day: string;
  id: number;
  incOrDecTrue: number;
  inc0rDecFalse: number;
  name: string;
  stockAmount: number;
};

const History: FC = memo(() => {
  const [itemDatas, setItemDatas] = useState<Items[]>([]);
  const [originalItemName, setOriginalItemName] = useState<Props[]>([]);
  const [filterItemName, setFilterItemName] = useState<Props[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectItem, setSelectItem] = useState<string>("");

  useEffect(() => {
    const historyDataFetch = async () => {
      const historyResponse = await fetch("http://localhost:8880/stockhistory");
      const historyData = await historyResponse.json();

      const itemResponse = await fetch("http://localhost:8880/items");
      const itemData = await itemResponse.json();
      setItemDatas(itemData);

      //商品名入りのオブジェクト作成
      const mergeObj = historyData.map((history: { itemId: number }) => {
        const items = itemData.find(
          (item: { id: number }) => item.id === history.itemId
        );
        return items ? { ...history, name: items.name } : history;
      });

      //日付文字列を置き換え
      const dateMergeObj = mergeObj.map((item: any) => {
        const dateOnly = item.day?.split("T")[0];
        return {
          ...item,
          day: dateOnly,
        };
      });

      //消費と補充を合わせる
      const modifiedMergeObj = Object.values(
        dateMergeObj.reduce((acc: any, obj: any) => {
          const key = obj.itemId + "-" + obj.day;
          if (!acc[key]) {
            acc[key] = {
              day: obj.day,
              name: obj.name,
              incOrDecTrue: obj.incOrDec === true ? obj.quantity : 0, //補充数
              incOrDecFalse: obj.incOrDec === false ? obj.quantity : 0, //消費数
              stockAmount: obj.stockAmount,
            };
          } else {
            if (obj.incOrDec === true) {
              acc[key].incOrDecTrue += obj.quantity;
            } else {
              acc[key].incOrDecFalse += obj.quantity;
            }
          }
          return acc;
        }, {})
      );

      setOriginalItemName(modifiedMergeObj as Props[]); //初期履歴データ
      setFilterItemName(modifiedMergeObj as Props[]); //検索用履歴データ
    };
    historyDataFetch();
  }, []);
  console.log(itemDatas, 817);

  const searchHistory = () => {
    //商品検索
    const itemMatchResult = originalItemName.filter(
      (item) => item.name === selectItem
    );
    setFilterItemName(itemMatchResult);
    console.log(itemMatchResult);

    //日付検索
    //     const dateMatchResult = originalItemName.filter(
    //       (item) => item.day >= startDate && item.day <= endDate
    //     );
    //     setFilterItemName(dateMatchResult);
  };

  return (
    <>
      <Box>
        <Card>
          <Box sx={{ m: "30px" }}>
            <AdmTitleText children="在庫履歴確認" />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <label
                style={{ marginRight: "20px", width: "50px" }}
                htmlFor="period"
              >
                期間
              </label>
              <SecondaryInput
                type="date"
                style={{ marginRight: "5px" }}
                id="period"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setStartDate(e.target.value)
                }
              />
              <span
                style={{
                  fontSize: "1.5rem",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                〜
              </span>
              <SecondaryInput
                type="date"
                style={{ marginLeft: "5px" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEndDate(e.target.value)
                }
              />
            </Box>
            <Box sx={{ mt: "40px" }}>
              <Stack
                direction="row"
                sx={{ alignItems: "flex-end", justifyContent: "space-between" }}
                spacing={2}
              >
                <Box>
                  <label style={{ marginRight: "20px" }} htmlFor="itemName">
                    商品名
                  </label>
                  <Select
                    defaultValue="商品を選択"
                    onChange={(e: SelectChangeEvent<string>) =>
                      setSelectItem(e.target.value)
                    }
                    sx={[
                      {
                        "&:hover": {
                          outline: "none",
                        },
                      },
                      { width: "200px" },
                    ]}
                  >
                    <MenuItem value="商品を選択" disabled>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>
                          商品を選択
                        </Typography>
                      </Box>
                    </MenuItem>
                    {itemDatas.map((item: Items) => {
                      return (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
                <Box>
                  <ActiveDarkBlueButton
                    children="履歴検索"
                    event={searchHistory}
                  />
                </Box>
              </Stack>
            </Box>
          </Box>
        </Card>
        <TableContainer component={Paper} sx={{ mt: "50px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#C0C0C0", fontWeight: "bold" }}>
                <TableCell sx={{ width: "150px" }}>商品名</TableCell>
                <TableCell align="right">登録日</TableCell>
                <TableCell align="right" sx={{ width: "150px" }}>
                  消費数
                </TableCell>
                <TableCell align="right" sx={{ width: "150px" }}>
                  補充数
                </TableCell>
                <TableCell align="right" sx={{ width: "150px" }}>
                  在庫合計
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterItemName.map((history: any) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={history.id}
                  >
                    <TableCell component="th" scope="row">
                      {history.name}
                    </TableCell>

                    <TableCell align="right">{history.day}</TableCell>
                    <TableCell align="right">{history.incOrDecFalse}</TableCell>
                    <TableCell align="right">{history.incOrDecTrue}</TableCell>
                    <TableCell align="right">{history.stockAmount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {filterItemName.length === 0 &&
              (startDate || endDate || selectItem) && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <p style={{ marginLeft: "20px" }}>検索結果がありません</p>
                  </TableCell>
                </TableRow>
              )}
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", m: "20px" }}>
          <Pagination count={3} />
        </Box>
      </Box>
    </>
  );
});

export default History;
