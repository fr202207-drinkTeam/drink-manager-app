import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PrimaryButton } from "../atoms/button/Button";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

//types
import { Items } from "../../types/type";
//icon
import SearchIcon from "@mui/icons-material/Search";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";

type PollCardProps = {
  data: Items[];
};

const PollCard = ({ data }: PollCardProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          mt: 5,
        }}
      >
        {data.map((drink: Items) => {
          return (
            <Card
              sx={{
                width: 270,
                m: 2,
                boxShadow: "none",
                border: "solid 1px ",
                borderColor: "#bfbec5",
              }}
            >
              <CardActionArea component="a" href={`/home/search/${drink.id}`}>
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
                    image={drink.image}
                    title="商品名"
                    sx={{
                      display: "block",
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      m: "auto",
                    }}
                  />
                  <CardContent sx={{ height: "150px" }}>
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
                        height: "200",
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
                <PrimaryButton
                  onClick={() => {
                    navigate(`/home/search/${drink.id}`);
                  }}
                  sx={{
                    background: "#C89F81",
                    mb: 1,
                    width: 200,
                    boxShadow: "none",
                    fontWeight: "bold",
                    ml: 4,
                    border: "double",
                    ":hover": {
                      background: "#8d6449",
                      cursor: "pointer",
                    },
                  }}
                >
                  <SearchIcon />
                  詳細を見る
                </PrimaryButton>
                <PrimaryButton
                  sx={{
                    background: "#e29399",
                    width: 200,
                    mb: 2,
                    boxShadow: "none",
                    border: "double",
                    fontWeight: "bold",
                    ml: 4,
                    ":hover": {
                      background: "#e29399",
                      cursor: "pointer",
                    },
                  }}
                >
                  <SwitchAccessShortcutAddIcon />
                  &nbsp;投票する
                </PrimaryButton>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </>
  );
};

export default PollCard;
