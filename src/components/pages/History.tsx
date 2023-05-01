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
  const [itemName, setItemName] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

      const originalDate = "2023-05-2T02:50:27.944Z";
      const dateOnly = originalDate.split("T")[0];

      //日付文字列を置き換え
      const modifiedMergeObj = mergeObj.map((item: Items) => {
        return {
          ...item,
          day: dateOnly,
        };
      });
      setItemName(modifiedMergeObj);
    };
    historyDataFetch();
  }, []);

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
                    <MenuItem value="coffee">コーヒー</MenuItem>
                    <MenuItem value="cocoa">ココア</MenuItem>
                    <MenuItem value="tea">紅茶</MenuItem>
                  </Select>
                </Box>
                <Box>
                  <ActiveDarkBlueButton
                    children="履歴検索"
                    event={() => alert("履歴検索")}
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
                <TableCell>商品名</TableCell>
                <TableCell align="right">登録日</TableCell>
                <TableCell align="right">消費数</TableCell>
                <TableCell align="right">補充数</TableCell>
                <TableCell align="right">在庫合計</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemName.map((history: any) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={history.id}
                  >
                    <TableCell component="th" scope="row">
                      {history.name}
                    </TableCell>

                    <TableCell align="right">{history.day}</TableCell>
                    <TableCell align="right">{history.quantity}</TableCell>
                    <TableCell align="right">{history.quantity}</TableCell>
                    <TableCell align="right">100</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
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
