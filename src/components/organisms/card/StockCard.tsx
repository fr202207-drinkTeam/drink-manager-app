import { Dispatch, FC, SetStateAction, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { Items, StockHistory } from "../../../types/type";
import { StockInput } from "../../atoms/input/StockInput";

type Props = {
  itemData: Array<Items>;
  inTheOfficeItemArr: Array<StockHistory>;
  inputValueArr: Array<number>;
  setInputValueArr: Dispatch<SetStateAction<number[]>>;
};

const StockCard: FC<Props> = (props) => {
  const {
    itemData,
    inTheOfficeItemArr,
    inputValueArr,
    setInputValueArr,
  } = props;
  const [inputStatusArr, setInputStatusArr] = useState<boolean[]>([]);

  const testFunc = (drinkId: number) => {
    if (inTheOfficeItemArr.length > 0) {
      for (let i = 0; i < inTheOfficeItemArr.length; i++) {
        if (inTheOfficeItemArr[i]?.itemId === drinkId) {
          return inTheOfficeItemArr[i].stockAmount;
        }
      }
    }
    return 0;
  };

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
        <Grid container spacing={2}>
          {itemData?.map((drink, index) => {
            return (
              <Grid key={index} item xs={8} sm={4} md={4} lg={4}>
                <Card
                  key={index}
                  sx={{
                    boxShadow: "none",
                    border: "solid 1px ",
                    borderColor: "#bfbec5",
                    width: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="商品画像"
                    height="140"
                    width="140"
                    image={drink.image[0]}
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
                        fontSize: "15px",
                        borderBottom: "double",
                        fontFamily: "Georgia",
                      }}
                    >
                      {`${drink.name}`}
                    </Typography>
                  </CardContent>
                  <Typography sx={{ marginLeft: "36px" }}>
                    ※現在の在庫数は
                    <span style={{ fontWeight: "bold", alignItems: "center" }}>
                      {testFunc(drink.id)}
                    </span>
                    個です
                  </Typography>
                  <StockInput
                    index={index}
                    inputStatusArr={inputStatusArr}
                    setInputStatusArr={setInputStatusArr}
                    inputValueArr={inputValueArr}
                    setInputValueArr={setInputValueArr}
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
