import {
  Box,
  Card,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { ActiveDarkBlueButton } from "../atoms/button/Button";
import { SecondaryInput } from "../atoms/input/Input";
import AdmTitleText from "../atoms/text/AdmTitleText";
import { Items } from "../../types/type";

type Props = {};

const History: FC<Props> = memo((props) => {
  const [originalItemName, setOriginalItemName] = useState<any[]>([]);
  const [filterItemName, setFilterItemName] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [selectItem, setSelectItem] = useState("");

  useEffect(() => {
    const historyDataFetch = async () => {
      const historyResponse = await fetch("http://localhost:8880/stockhistory");
      const historyData = await historyResponse.json();

      const itemResponse = await fetch("http://localhost:8880/items");
      const itemData = await itemResponse.json();

      //商品名入りのオブジェクト作成
      const mergeObj = historyData.map((history: { itemId: number }) => {
        const items = itemData.find(
          (item: { id: number }) => item.id === history.itemId
        );
        return items ? { ...history, name: items.name } : history;
      });

      //日付文字列を置き換え
      // const modifiedMergeObj = mergeObj.map((item: any) => {
      //   const dateOnly = item.day?.split("T")[0];
      //   return {
      //     ...item,
      //     day: dateOnly,
      //   };
      // });
      setOriginalItemName(mergeObj);
      setFilterItemName(mergeObj);
    };
    historyDataFetch();
  }, []);

  const searchHistory = () => {
    //商品検索
    // const result = originalItemName.filter((item) => item.name === selectItem);
    // console.log(result);
    // setFilterItemName(result);

    const formattedStartDate = new Date(startDate).toISOString();
    const formattedEndDate = new Date(endDate).toISOString();

    console.log(formattedStartDate, formattedEndDate);
    console.log(originalItemName);

    const filteredItems = originalItemName.filter((item) => {
      const dateString = item.day.split("T")[0]; // 日付部分のみ抽出
      const itemDate = new Date(dateString);
      console.log(itemDate, 81);
      return (
        itemDate >= new Date(formattedStartDate) &&
        itemDate <= new Date(formattedEndDate)
      );
    });

    console.log(filteredItems, 90);

    // console.log(filteredItems);
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
                    placeholder="商品名"
                    value={selectItem}
                    sx={{ width: "200px" }}
                    onChange={(e: any) => setSelectItem(e.target.value)}
                  >
                    <MenuItem value="コーヒー">コーヒー</MenuItem>
                    <MenuItem value="ココア">ココア</MenuItem>
                    <MenuItem value="紅茶">紅茶</MenuItem>
                    <MenuItem value="ブライトブレンド">
                      ブライトブレンド
                    </MenuItem>
                    <MenuItem value="LAVAZZA CLASSICO">
                      LAVAZZA CLASSICO
                    </MenuItem>
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

                    <TableCell align="right">
                      {history.day.split("T")[0]}
                    </TableCell>
                    <TableCell align="right">
                      {history.incOrDec ? 0 : history.quantity}
                    </TableCell>
                    <TableCell align="right">
                      {history.incOrDec ? history.quantity : 0}
                    </TableCell>
                    <TableCell align="right">100</TableCell>
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
