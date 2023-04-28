import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { PrimaryButton } from "../atoms/button/Button";
import AccordionMenu from "../atoms/accordion/AccordionMenu";
import Header from "./Header";
import Footer from "./Footer";
import { CardMedia } from "@mui/material";
import { ActiveOrangeButton } from "../atoms/button/Button";
import { useLocation } from "react-router-dom";
import Slider from "../atoms/slider/Slider";
import ItemSearchForm from "../molecules/ItemSearchForm";
function DefaultLayout({ children }: { children: any }) {
  const handleButtonClick = () => {};
  // パスの取得
  const location = useLocation();
  console.log(location.pathname);
  const images = ["../top.png", "../top.png", "../top.png"];
  return (
    <React.Fragment>
      <Header />
      {/* ユーザートップページのみスライダーの表示 */}
      {location.pathname === "/home" ? (
        <Slider
          images={images}
          slidesPerView={1}
          loop={false}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={false}
          // style={style}
        />
      ) : (
        ""
      )}
      <Container maxWidth="xl" sx={{ mt: 10, mb: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <AccordionMenu />
            {/* 検索ボタン */}

            <Typography
              variant="h5"
              textAlign="center"
              sx={{ color: "#ea6f00", mt: 10 }}
            >
              - キーワードで探す -
            </Typography>
            <Box sx={{ mb: 10 }}>
              {/* <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{ my: 4, width: "100%", backgroundColor: "#fff" }}
              />
              <ActiveOrangeButton
                event={handleButtonClick}
                sxStyle={{ width: "100%" }} // ここでwidthを指定する
              >
                検索する
              </ActiveOrangeButton> */}
              <ItemSearchForm
                searchWord={""}
                setSearchWord={function (
                  value: React.SetStateAction<string>
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <Box sx={{ my: 4 }}>
                <img src="/dummybanner.jpg" style={{ maxWidth: "100%" }} />
              </Box>
              <Box>
                <img src="/dummybanner.jpg" style={{ maxWidth: "100%" }} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
      </Container>
      {/* チャットボット  /adminhome から始まるパス名の際には非表示*/}
      {!location.pathname.startsWith("/adminhome") ? (
        <Box
          sx={{
            borderRadius: 20,
            position: "fixed",
            bottom: 20,
            right: 10,
            zIndex: 1,
            width: 100,
            height: 100,
          }}
        >
          <img
            src="/chatbot.png"
            style={{ maxWidth: "100%", borderRadius: "20px" }}
          />
        </Box>
      ) : (
        ""
      )}
      <Footer />
    </React.Fragment>
  );
}
export default DefaultLayout;
