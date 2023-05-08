import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CategoryAccordion from "../atoms/accordion/CategoryAccordion";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import Slider from "../atoms/slider/Slider";
import ItemSearchForm from "../molecules/ItemSearchForm";
import { Items } from "../../types/type";
function DefaultLayout({ children }: { children: any }) {
  const handleButtonClick = () => {};
  // パスの取得
  const location = useLocation();
  console.log(location.pathname);
  const images = ["../top.png", "../top.png", "../top.png"];
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState<Items[]>();
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
      <Container maxWidth="xl" sx={{ mt: 10, mb: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <CategoryAccordion />
            {/* 検索ボタン */}

            <Typography
              variant="h5"
              textAlign="center"
              sx={{ color: "#ea6f00", mt: 10 }}
            >
              - キーワードで探す -
            </Typography>
            <Box sx={{ mb: 10 }}>
              <ItemSearchForm
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
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
