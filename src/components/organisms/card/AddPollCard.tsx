import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Items } from "../../../types/type";
import { ActiveBorderButton, ActiveDarkBlueButton } from "../../atoms/button/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from '@mui/icons-material/Check';

type ItemCardProps = {
  data: Items[];
  sxStyle?: any;
  selectedItems: number[]
  setSelectedItems: any
};

const ItemCard = ({ data, sxStyle, selectedItems, setSelectedItems }: ItemCardProps) => {
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
          justifyContent: "center",
          // flex: "end",
          mt: 5,
        }}
      >
        {data &&
          data.map((drink: Items, index) => {
            return (
              <Card
                sx={{
                  width: {
                    xs: "180px",
                    sm: "180px",
                    md: "250px",
                    lg: "250px",
                    xl: "290px"
                  },
                  m: 1,
                  // px: 1,
                  mx: 2,
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
                  image={drink.image[0]}
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
                      fontSize: "11px",
                      borderBottom: "double",
                      fontWeight: "bold",
                      fontFamily: "Georgia",
                      mt: 1
                    }}
                  >
                    {drink.name}
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
                      event={() => {
                        handleClick(drink.id);
                      }}
                    >
                      <AddCircleOutlineIcon sx={{
                        fontSize: {
                          xs: "17px",
                          sm: "17px",
                          md: "19px",
                          lg:"22px",
                          xl:"22px"
                        },
                      }} /> 追加
                    </ActiveDarkBlueButton>
                  </Box>
                )}
              </Card>
            );
          })}
      </Box>
    </>
  );
};

export default ItemCard;
