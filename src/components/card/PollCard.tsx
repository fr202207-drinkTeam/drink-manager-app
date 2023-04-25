import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  ActiveBeigeButton,
  InactiveButton,
  PrimaryButton,
} from "../atoms/button/Button";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../store/loginUserState";

//types
import { Items, Users } from "../../types/type";
//icon
import SearchIcon from "@mui/icons-material/Search";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";

type PollCardProps = {
  data: Items[];
  pollNum: number;
  pollCategory: number;
};

export const generateUniqueId = async () => {
  let id = Math.floor(Math.random() * 1000) + 1;
  const res = await fetch("http://localhost:8880/polls");
  const data = await res.json();
  while (data.includes(id)) {
    id = Math.floor(Math.random() * 1000) + 1;
  }
  return id;
};

const PollCard = ({ data, pollNum, pollCategory }: PollCardProps) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<Users>();
  //recoil
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const userId = loginUser.id;

  //ユーザ1を取得(後で消す)
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/users/1`); //仮でユーザID1のユーザでテスト中
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  //投票ボタン
  const submitPoll = async (drinkId: number) => {
    try {
      const data = {
        id: await generateUniqueId(),
        questionnaireId: pollNum,
        userId: userId,
        result: drinkId,
        createdAt: new Date(),
      };
      const response = await fetch("http://localhost:8880/polls", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData);
      //投票カテゴリは人気投票かどうか。recoilでtruefalse切り替え//後でuser情報入れる
      //usersの情報を入れる
      if (pollCategory === 1) {
        const response = await fetch("http://localhost:8880/users/1", {
          //後で変更
          method: "PUT",
          body: JSON.stringify({
            ...users,
            polledPopular: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        setUsers((prevUsers:any) => ({
          ...prevUsers,
          polledPopular: true,
        }));
        console.log(responseData);
      } else {
        const response = await fetch("http://localhost:8880/users/1", {
          //後で変更
          method: "PUT",
          body: JSON.stringify({
            ...users,
            polledOther: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        setUsers((prevUsers:any) => ({
          ...prevUsers,
          polledOther: true,
        }));
        console.log(responseData);
      }
    } catch (err) {
      console.log(err, "エラー");
    }
  };

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
                }}
                key={index}
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
                </CardActionArea>
                <ActiveBeigeButton
                  onClick={() => {
                    navigate(`/home/search/${drink.id}`);
                  }}
                  sxStyle={{
                    background: "#C89F81",
                    mb: 1,
                    width: 200,
                    boxShadow: "none",
                    fontWeight: "bold",
                    ml: 4,
                    border: "double",
                  }}
                  event={() => {
                    navigate(`/home/search/${drink.id}`);
                  }}
                >
                  <SearchIcon />
                  詳細を見る
                </ActiveBeigeButton>
                {(users?.polledPopular && pollCategory === 1) ||
                (users?.polledOther && pollCategory === 2) ? (
                  <InactiveButton
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
                    &nbsp;投票しました
                  </InactiveButton>
                ) : (
                  <PrimaryButton
                    onClick={() => submitPoll(drink.id)}
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
                )}
              </Card>
            );
          })}
      </Box>
    </>
  );
};

export default PollCard;
