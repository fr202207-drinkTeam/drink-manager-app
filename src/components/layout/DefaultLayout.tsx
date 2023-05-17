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
import { Link, useLocation } from "react-router-dom";
import Slider from "../atoms/slider/Slider";
import ItemSearchForm from "../molecules/ItemSearchForm";
import { Items } from "../../types/type";
import { Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import ScrollPageTop from "../atoms/ScrollPageTop";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";

function DefaultLayout({ children,props }: { children: any,props?:any }) {
  const handleButtonClick = () => {};
  // パスの取得
  const location = useLocation();
  const images = ["../top.png", "../top.png", "../top.png"];
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState<Items[]>();
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
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
                <Link to="/home/timeline">
                  <img src="/timeline.png" style={{ maxWidth: "100%" }} />
                </Link>
              </Box>
              <Box>
                <Link to="/home/poll">
                  <img src="/poll.png" style={{ maxWidth: "100%" }} />
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
      </Container>
      {/* チャットボット管理者でのログイン時に非表示 */}
      {!loginUser?.isAdmin ? (
        <Link to="/faq" target="_blank">
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
        </Link>
      ) : (
        ""
      )}
       <ScrollPageTop {...props}>
          <Fab
            size="large"
            aria-label="scroll back to top"
            sx={{
              bottom: "120px",
              backgroundColor: "#9AB7CA",
              color: "#fff",
              ":hover": {
                background: "#9AB7CA",
                cursor: "pointer",
              },
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        </ScrollPageTop>
      <Footer />
    </React.Fragment>
  );
}
export default DefaultLayout;
