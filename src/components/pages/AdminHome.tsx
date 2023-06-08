import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Paper, Stack } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import DefaultLayout from "../layout/DefaultLayout";

import AdmTitleText from "../atoms/text/AdmTitleText";

type Props = {};

const AdminHome: FC<Props> = memo((props) => {
  return (
    <>
      <DefaultLayout>
        <Paper
          sx={{
            width: "100%",
            pb: '50px',
          }}
        >
          <Box id="top" />
          <Box sx={{ p: "30px" }}>
            <AdmTitleText>管理者MENU</AdmTitleText>
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            // spacing={8}
            flexWrap="wrap"
            mx="70px"
          >
            <Link to="/adminhome/addition">
              <Box
                sx={{
                  width: {xs: "130px", sm: "130px", md: 200, lg: 200},
                  height: {xs: "130px", sm: "130px", md: 200, lg: 200},
                  backgroundColor: "#024098",
                  textAlign: "center",
                  borderRadius: "20px",
                  border: "1px solid",
                  margin: "10px",
                  backgroundImage:
                    "linear-gradient(to bottom, #024098 70%, #fff 30%)",
                  "&:hover": {
                    opacity: 0.8,
                    cursor: "pointer",
                  },
                }}
              >
                <AddBoxIcon
                  sx={{
                    width: {xs: "80px", sm: "80px", md: "130px", lg: "130px"},
                    height: {xs: "80px", sm: "80px", md: "130px", lg: "130px"},
                    color: "white",
                    paddingTop: "10px",
                  }}
                />
                <Typography
                  fontFamily="Source Han Sans"
                  sx={{ color: "black", fontSize: {xs: "16px", sm: "16px", md: "20px", lg: "20px"}, marginTop: "10px" }}
                >
                  補充在庫入力
                </Typography>
              </Box>
            </Link>
            <Link to="/adminhome/consumption">
              <Box
                sx={{
                  width: {xs: "130px", sm: "130px", md: 200, lg: 200},
                  height: {xs: "130px", sm: "130px", md: 200, lg: 200},
                  backgroundColor: "#024098",
                  textAlign: "center",
                  borderRadius: "20px",
                  border: "1px solid",
                  margin: "10px",
                  backgroundImage:
                    "linear-gradient(to bottom, #024098 70%, #fff 30%)",
                  "&:hover": {
                    opacity: 0.8,
                    cursor: "pointer",
                  },
                }}
              >
                <IndeterminateCheckBoxIcon
                  sx={{
                    width: {xs: "80px", sm: "80px", md: "130px", lg: "130px"},
                    height: {xs: "80px", sm: "80px", md: "130px", lg: "130px"},
                    color: "white",
                    paddingTop: "10px",
                  }}
                />
                <Typography
                  fontFamily="Source Han Sans"
                  sx={{ color: "black", fontSize: {xs: "16px", sm: "16px", md: "20px", lg: "20px"}, marginTop: "10px" }}
                >
                  消費在庫入力
                </Typography>
              </Box>
            </Link>
            <Link to="/adminhome/history">
              <Box
                sx={{
                  width: {xs: "130px", sm: "130px", md: 200, lg: 200},
                  height: {xs: "130px", sm: "130px", md: 200, lg: 200},
                  backgroundColor: "#024098",
                  textAlign: "center",
                  borderRadius: "20px",
                  border: "1px solid",
                  margin: "10px",
                  backgroundImage:
                    "linear-gradient(to bottom, #024098 70%, #fff 30%)",
                  "&:hover": {
                    opacity: 0.8,
                    cursor: "pointer",
                  },
                }}
              >
                <ManageSearchIcon
                  sx={{
                    width: {xs: "80px", sm: "80px", md: "130px", lg: "130px"},
                    height: {xs: "80px", sm: "80px", md: "130px", lg: "130px"},
                    color: "white",
                    paddingTop: "10px",
                  }}
                />
                <Typography
                  fontFamily="Source Han Sans"
                  sx={{ color: "black", fontSize: {xs: "16px", sm: "16px", md: "20px", lg: "20px"}, marginTop: "10px" }}
                >
                  在庫履歴
                </Typography>
              </Box>
            </Link>
            <Link to="/adminhome/addpoll">
              <Box
                sx={{
                  width: {xs: "130px", sm: "130px", md: 200, lg: 200},
                  height: {xs: "130px", sm: "130px", md: 200, lg: 200},
                  backgroundColor: "#024098",
                  textAlign: "center",
                  borderRadius: "20px",
                  border: "1px solid",
                  margin: "10px",
                  backgroundImage:
                    "linear-gradient(to bottom, #024098 70%, #fff 30%)",
                  "&:hover": {
                    opacity: 0.8,
                    cursor: "pointer",
                  },
                }}
              >
                <AssignmentIcon
                  sx={{
                    width: {xs: "80px", sm: "80px", md: "130px", lg: "130px"},
                    height: {xs: "80px", sm: "80px", md: "130px", lg: "130px"},
                    color: "white",
                    paddingTop: "10px",
                  }}
                />
                <Typography
                  fontFamily="Source Han Sans"
                  sx={{ color: "black", fontSize: {xs: "16px", sm: "16px", md: "20px", lg: "20px"}, marginTop: "10px" }}
                >
                  アンケート追加
                </Typography>
              </Box>
            </Link>
          </Stack>
        </Paper>
      </DefaultLayout>
    </>
  );
});

export default AdminHome;
