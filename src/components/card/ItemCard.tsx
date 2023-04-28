import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Items } from "../../types/type";
import { Link } from "react-router-dom";
type ItemCardProps = {
  data: Items[];
};

const ItemCard = ({ data }: ItemCardProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          mt: 5,
        }}
      >
        {data?.map((drink: Items, index) => (
          <Link
            to={`/home/search/${drink.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                width: 270,
                m: 2,
                boxShadow: "none",
                border: "solid 1px ",
                borderColor: "#bfbec5",
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
              <CardActionArea>
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
                <CardContent
                  sx={{
                    height: "140px",
                  }}
                >
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
                      fontSize: "16px",
                      borderBottom: "double",
                      fontFamily: "Georgia",
                      fontWeight: "bold",
                    }}
                  >
                    {drink.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    sx={{ textAlign: "center", fontSize: "13px" }}
                  >
                    {drink.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </Box>
    </>
  );
};

export default ItemCard;
