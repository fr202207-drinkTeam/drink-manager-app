import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Items } from "../../types/type";
import { ActiveBorderButton, ActiveDarkBlueButton, ActiveGrayButton, InactiveButton } from "../atoms/button/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from '@mui/icons-material/Check';

type ItemCardProps = {
  data: Items[];
  sxStyle?: any;
  selectedItems:number[]
  setSelectedItems:any
};

const ItemCard = ({ data, sxStyle,selectedItems,setSelectedItems }: ItemCardProps) => {
  // const navigate = useNavigate();


  const handleClick = async (id: number) => {
    if (!selectedItems.includes(id)) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          flex: "end",
          mt: 5,
          ml:5
        }}
      >
        {data &&
          data.map((drink: Items, index) => {
            return (
              <Card
                sx={{
                  width: 270,
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

                <CardMedia
                  component="img"
                  alt="商品画像"
                  height="140"
                  width="140"
                  image={drink.image[0]}
                  title="商品名"
                  sx={{
                    display: "block",
                    width: 150,
                    height: 150,
                    objectFit: "cover",
                    m: "auto",
                    p:1
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
                      fontFamily: "Georgia",
                    }}
                  >
                    {drink.name}
                  </Typography>
                </CardContent>
                {selectedItems.includes(drink.id) ? (
                  <ActiveBorderButton
                    sxStyle={{
                      width: 200,
                      mb: 2,
                      boxShadow: "none",
                      border: "double",
                      fontWeight: "bold",
                      ml: 4,
                    }}
                     event={() => {
                      handleClick(drink.id);
                    } }                  >
                    <CheckIcon/>&nbsp;追加されました
                  </ActiveBorderButton>
                ) : (
                  <ActiveDarkBlueButton
                    sxStyle={{
                      mb: 1,
                      width: 200,
                      boxShadow: "none",
                      fontWeight: "bold",
                      ml: 4,
                      border: "double",
                    }}
                    event={() => {
                      handleClick(drink.id);
                    }}
                  >
                    <AddCircleOutlineIcon /> &nbsp;追加
                  </ActiveDarkBlueButton>
                )}
              </Card>
            );
          })}
      </Box>
    </>
  );
};

export default ItemCard;
