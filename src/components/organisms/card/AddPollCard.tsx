import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { Items } from "../../../types/type";
import { ActiveBorderButton, ActiveDarkBlueButton } from "../../atoms/button/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

type ItemCardProps = {
  data: Items[];
  sxStyle?: any;
  selectedItems: number[]
  setSelectedItems: any
};

const ItemCard = ({ data, sxStyle, selectedItems, setSelectedItems}: ItemCardProps) => {
  // const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(false);

  const handleClick = async (id: number) => {
    if (!selectedItems.includes(id)) {
      setSelectedItems([...selectedItems, id]);
      setSelectedItem(true)
      console.log(selectedItem)
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
      setSelectedItem(false)

    }
  };

  console.log(selectedItem)

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          mt: 2,
        }}
      >
        <Grid container spacing={2}>
        {data &&
          data.map((drink: Items, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
              <Card
                sx={{
                  m: 1,
                  boxShadow: "none",
                  border: "solid 1px ",
                  borderColor: "#bfbec5",
                  ...sxStyle,
                }}
                data-testid={selectedItem ? 'selected-card' : 'poll-card'}
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
                  image="../cocoa.png"
                  title="商品名"
                  sx={{
                    display: "block",
                    width: {
                      xs: "150px",
                      sm: "150px",
                      md: "200px",
                    },
                    height: {
                      xs: "150px",
                      sm: "150px",
                      md: "200px",
                    },
                    m:"auto",
                    pt: 1,
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
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        md: "14px",
                        lg:"18px",
                        xl:"18px"
                      },
                      borderBottom: "double",
                      fontWeight: "bold",
                      mt: 1
                    }}
                  >
                    {drink.itemName}
                  </Typography>
                </CardContent>
                {selectedItems.includes(drink.id) ? (
                  <Box sx={{ display: "flex", justifyContent: "center", margin: "auto", mb: 3 }}>
                    <ActiveBorderButton
                      sxStyle={{
                        display: "block",
                        width: 200,
                        mb: 2,
                        boxShadow: "none",
                        border: "double",
                        fontWeight: "bold",
                        m: "auto",
                        fontSize: {
                          xs: "11px",
                          sm: "13px",
                          md: "15px",
                          lg:"18px",
                          xl:"18px"
                        },
                      }}
                      data-testid={selectedItem ? 'add-button' : 'poll-button'}
                      event={() => {
                        handleClick(drink.id);
                      }}                  >
                      <CheckIcon sx={{
                        fontSize: {
                          xs: "13px",
                          sm: "13px",
                          md: "15px",
                          lg:"18px",
                          xl:"18px"
                        },
                      }} />&nbsp;追加されました
                    </ActiveBorderButton>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", justifyContent: "center", m: "auto", mb: 3 }}>
                    <ActiveDarkBlueButton
                      sxStyle={{
                        display: "block",
                        mb: 1,
                        width: 200,
                        boxShadow: "none",
                        fontWeight: "bold",
                        m: "auto",
                        border: "double",
                        fontSize: {
                          xs: "13px",
                          sm: "13px",
                          md: "15px",
                          lg:"18px",
                          xl:"18px"
                        },
                      }}
                      data-testid={selectedItem ? 'add-button' : 'poll-button'}
                      event={() => {
                        handleClick(drink.id);
                      }}
                    >
                    追加
                    </ActiveDarkBlueButton>
                  </Box>
                )}
              </Card>
              </Grid>
            );
          })}
          </Grid>
      </Box>
    </>
  );
};

export default ItemCard;
