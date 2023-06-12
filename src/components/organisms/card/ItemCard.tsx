import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { Items } from "../../../types/type";

type ItemCardProps = {
  data: Items[]|Items;
  sxStyle?: any;
  sxBox?: any;
};

const ItemCard = ({ data, sxStyle, sxBox }: ItemCardProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          mt: 2,
          ...sxBox,
        }}
      >
        <Grid container spacing={2}>
        {Array.isArray(data) ? (
          data?.map((drink: Items, index: React.Key | null | undefined) => (
            <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
              <Card
                sx={{
                  m: 2,
                  boxShadow: "none",
                  border: "solid 1px ",
                  borderColor: "#bfbec5",
                  ...sxStyle,
                }}
                key={index}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  sx={{
                    textAlign: "center",
                    fontSize: "13px",
                    backgroundColor: "#d6c6af",
                    width: 80,
                    p: "3px",
                    color: "#000",
                    borderRadius: "3px",
                  }}
                >
                  {(() => {
                    if (
                      Number(drink.itemCategory) >= 1 &&
                      Number(drink.itemCategory) <= 4
                    ) {
                      return "コーヒー";
                    } else if (drink.itemCategory === 5) {
                      return "ティー";
                    } else if (drink.itemCategory === 6) {
                      return "ココア";
                    } else {
                      return "その他";
                    }
                  })()}
                </Typography>
                <CardActionArea component="a" href={`/home/search/${drink.id}`}>
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
                      p: 1,
                      objectFit: "cover",
                      m: "auto",
                    }}
                  />
                  <CardContent >
                    {drink.intheOffice ? (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{
                          textAlign: "center",
                          fontSize: "13px",
                          backgroundColor: "#e0ebaf",
                          width: 80,
                          p: "3px",
                          color: "#000",
                          borderRadius: "3px",
                        }}
                      >
                        社内あり
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{
                          textAlign: "center",
                          fontSize: "13px",
                          backgroundColor: "#a4c1d7",
                          width: 80,
                          p: "3px",
                          color: "#000",
                          borderRadius: "3px",
                        }}
                      >
                        社内なし
                      </Typography>
                    )}
                    <Typography
                      gutterBottom
                      sx={{
                        textAlign: "center",
                        fontSize: "15px",
                        borderBottom: "double",
                        fontWeight: "bold",
                        height: "200",
                        mt: 1,
                      }}
                    >
                      {drink.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
          ) : ( 
            <Grid   item xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  m: 2,
                  boxShadow: "none",
                  border: "solid 1px ",
                  borderColor: "#bfbec5",
                  ...sxStyle,
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  sx={{
                    textAlign: "center",
                    fontSize: "13px",
                    backgroundColor: "#d6c6af",
                    width: 80,
                    p: "3px",
                    color: "#000",
                    borderRadius: "3px",
                  }}
                >
                  {(() => {
                    if (
                      Number(data.itemCategory) >= 1 &&
                      Number(data.itemCategory) <= 4
                    ) {
                      return "コーヒー";
                    } else if (data.itemCategory === 5) {
                      return "ティー";
                    } else if (data.itemCategory === 6) {
                      return "ココア";
                    } else {
                      return "その他";
                    }
                  })()}
                </Typography>
                <CardActionArea component="a" href={`/home/search/${data.id}`}>
                  <CardMedia
                    component="img"
                    alt="商品画像"
                    height="140"
                    width="140"
                    image={data.image[0]}
                    title="商品名"
                    sx={{
                      display: "block",
                      width: 200,
                      height: 200,
                      p: 1,
                      objectFit: "cover",
                      m: "auto",
                    }}
                  />
                  <CardContent >
                    {data.intheOffice ? (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{
                          textAlign: "center",
                          fontSize: "13px",
                          backgroundColor: "#e0ebaf",
                          width: 80,
                          p: "3px",
                          color: "#000",
                          borderRadius: "3px",
                        }}
                      >
                        社内あり
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{
                          textAlign: "center",
                          fontSize: "13px",
                          backgroundColor: "#a4c1d7",
                          width: 80,
                          p: "3px",
                          color: "#000",
                          borderRadius: "3px",
                        }}
                      >
                        社内なし
                      </Typography>
                    )}
                    <Typography
                      gutterBottom
                      sx={{
                        textAlign: "center",
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                          md: "14px",
                          lg:"18px",
                          xl:"18px"
                        },
                        borderBottom: "double",
                        fontWeight: "bold",
                        height: "200",
                        mt: 1,
                      }}
                    >
                      {data.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ItemCard;
