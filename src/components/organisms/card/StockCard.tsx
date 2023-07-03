import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import type { Item, StockHistory } from "../../../types/type";
import { StockInput } from "../../atoms/input/StockInput";

type Props = {
  itemData: Item[] | undefined;
  inputValueArr: Array<number>;
  setInputValueArr: Dispatch<SetStateAction<number[]>>;
  stockItems: StockHistory[];
  setStockItems: Dispatch<SetStateAction<StockHistory[]>>;
  sxStyle?: any;
};

const StockCard: FC<Props> = (props) => {
  const {
    itemData,
    inputValueArr,
    setInputValueArr,
    stockItems,
    setStockItems,
  } = props;
  const [inputStatusArr, setInputStatusArr] = useState<boolean[]>([]);

  const stockAmountDisplayFnc: (stockHistory: StockHistory[]) => number = (stockHistory) => {
    if(stockHistory.length > 0) {
      const latestStockHistory = stockHistory[stockHistory.length - 1]
    return latestStockHistory.stockAmount
    } else {
      return 0
    }
  }  

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          p: "10px"
        }}
      >
        {" "}
        <Grid container spacing={1}>
          {itemData?.map((drink, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                <Card
                  key={index}
                  sx={{
                    boxShadow: "none",
                    border: "solid 1px ",
                    borderColor: "#bfbec5",
                    p: "5px",
                    m: "auto",
                    ...props.sxStyle,
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="商品画像"
                    height="140"
                    width="140"
                    image="../cocoa.png"
                    title="商品名"
                    sx={{
                      display: "block",
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      m: "auto",
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        borderBottom: "double",
                      }}
                    >
                      {`${drink.itemName}`}
                    </Typography>
                  </CardContent>
                  <Typography sx={{ mx: 2, mb: 2, fontSize: {xs: "12px", sm: "12px", md: "14px", lg: "14px"} }}>
                    ※現在の在庫数は
                    <span style={{ fontWeight: "bold", alignItems: "center" }}>
                      {stockAmountDisplayFnc(drink.stock)}
                    </span>
                    個です
                  </Typography>
                  <StockInput
                    index={index}
                    inputStatusArr={inputStatusArr}
                    setInputStatusArr={setInputStatusArr}
                    inputValueArr={inputValueArr}
                    setInputValueArr={setInputValueArr}
                    stockItems={stockItems}
                    setStockItems={setStockItems}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default StockCard;
