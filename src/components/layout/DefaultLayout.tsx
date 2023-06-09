import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CategoryAccordion from "../atoms/accordion/CategoryAccordion";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import ItemSearchForm from "../molecules/ItemSearchForm";
import { Items } from "../../types/type";
import { CssBaseline, Drawer, Fab, IconButton, Toolbar } from "@mui/material";
import ScrollPageTop from "../atoms/ScrollPageTop";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import Cookies from "js-cookie";
import Footer from "./Footer";
import Slider from "../atoms/slider/Slider";
import SearchIcon from "@mui/icons-material/Search";

function DefaultLayout({ children, props }: { children: any; props?: any }) {
  // パスの取得
  const location = useLocation();
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState<Items[]>();
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });

  // 縮小時のサイドバーのサイズ
  const drawerWidth = 280;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ mx: 3 }}>
      <CategoryAccordion setMobileOpen={setMobileOpen} />
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
          setMobileOpen={setMobileOpen}
        />
        <Box sx={{ my: 4 }}>
          <Link to="/home/timeline">
            <img src="/timeline.png" alt="top" style={{ maxWidth: "100%" }} />
          </Link>
        </Box>
        <Box>
          <Link to="/home/poll">
            <img src="/poll.png" alt="top" style={{ maxWidth: "100%" }} />
          </Link>
        </Box>
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => document.body : undefined;

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
        />
      ) : (
        ""
      )}
      <Box sx={{ display: "flex", background: "#f4e9d2", pb: 7 }}>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { sm: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                border: "none",
                background: "#f4e9d2",
              },
            }}
          >
            <Toolbar />
            {drawer}
          </Drawer>
          <Box
            sx={{ pt: 14, display: { xs: "none", sm: "none", md: "block" } }}
          >
            {drawer}
          </Box>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            pb: 0,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" }, color: "#ea6f00" }}
            >
              <SearchIcon />
              <Typography variant="h6" noWrap>
                商品検索
              </Typography>
            </IconButton>
          </Toolbar>
          {children}
        </Box>
        {!loginUser?.isAdmin ? (
          <Link to="/home/faq" target="_blank">
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
                alt="chat"
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

        <CssBaseline />
      </Box>

      <Footer />
    </React.Fragment>
  );
}
export default DefaultLayout;
