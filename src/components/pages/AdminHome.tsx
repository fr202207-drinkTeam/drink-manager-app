import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Paper, Stack } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DefaultLayout from "../layout/DefaultLayout";
import PollIcon from "@mui/icons-material/Poll";
import AdmTitleText from "../atoms/text/AdmTitleText";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

type Props = {};

const AdminHome: FC<Props> = memo((props) => {
  const moveWaitingApprovalItem = () => {
    console.log("商品詳細画面へ遷移");
  };
  return (
    <>
      <DefaultLayout>
        <Paper
          sx={{
            width: "90%",
            pb: "50px",
            mx: "auto",
          }}
        >
          <Box id="top" />
          <Box sx={{ p: "30px" }}>
            <AdmTitleText>管理者MENU</AdmTitleText>
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "90%",
                lg: "90%",
              },
              mx: "auto",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "20px",
                    md: "24px",
                    lg: "24px",
                  },
                  p: "5px",
                  width: "90%",
                  mx: "auto",
                }}
              >
                在庫管理
              </Typography>

              <Box sx={{ display: "flex", mx: "50px", mb: "30px" }}>
                <Link to="/adminhome/addition">
                  <Box
                    sx={{
                      width: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      height: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      textAlign: "center",
                      borderRadius: "20px",
                      border: "2px solid",
                      margin: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      p: "10px",
                      "&:hover": {
                        opacity: 0.8,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <AddCircleOutlineIcon
                      sx={{ fontSize: 60, height: "60%", color: "#024098" }}
                    />
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "18px",
                          lg: "18px",
                        },
                        height: "40%",
                      }}
                    >
                      在庫補充
                    </Typography>
                  </Box>
                </Link>

                <Link to="/adminhome/consumption">
                  <Box
                    sx={{
                      width: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      height: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      textAlign: "center",
                      borderRadius: "20px",
                      border: "2px solid",
                      margin: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      p: "10px",
                      "&:hover": {
                        opacity: 0.8,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <RemoveCircleOutlineIcon
                      sx={{ fontSize: 60, height: "60%", color: "#024098" }}
                    />
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "18px",
                          lg: "18px",
                        },
                        height: "40%",
                      }}
                    >
                      在庫消費
                    </Typography>
                  </Box>
                </Link>

                <Link to="/adminhome/history">
                  <Box
                    sx={{
                      width: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      height: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      textAlign: "center",
                      borderRadius: "20px",
                      border: "2px solid",
                      margin: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      p: "10px",
                      "&:hover": {
                        opacity: 0.8,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <ManageSearchIcon
                      sx={{ fontSize: 60, height: "60%", color: "#024098" }}
                    />
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "18px",
                          lg: "18px",
                        },
                        height: "40%",
                      }}
                    >
                      在庫履歴
                    </Typography>
                  </Box>
                </Link>
              </Box>

              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "20px",
                    md: "24px",
                    lg: "24px",
                  },
                  p: "5px",
                  width: "90%",
                  mx: "auto",
                }}
              >
                アンケート管理
              </Typography>

              <Box sx={{ display: "flex", mx: "50px", mb: "30px" }}>
                <Link to="/adminhome/addpoll">
                  <Box
                    sx={{
                      width: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      height: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      textAlign: "center",
                      borderRadius: "20px",
                      border: "2px solid",
                      margin: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      p: "10px",
                      "&:hover": {
                        opacity: 0.8,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <PollIcon
                      sx={{ fontSize: 60, height: "60%", color: "#024098" }}
                    />
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "18px",
                          lg: "18px",
                        },
                        height: "40%",
                      }}
                    >
                      アンケート追加
                    </Typography>
                  </Box>
                </Link>

                <Link to="/adminhome/polleditfiltering">
                  <Box
                    sx={{
                      width: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      height: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      textAlign: "center",
                      borderRadius: "20px",
                      border: "2px solid",
                      margin: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      p: "10px",
                      "&:hover": {
                        opacity: 0.8,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <EditNoteIcon
                      sx={{ fontSize: 60, height: "60%", color: "#024098" }}
                    />
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "18px",
                          lg: "18px",
                        },
                        height: "40%",
                      }}
                    >
                      アンケート編集
                    </Typography>
                  </Box>
                </Link>
              </Box>

              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "20px",
                    md: "24px",
                    lg: "24px",
                  },
                  p: "5px",
                  width: "90%",
                  mx: "auto",
                }}
              >
                バナー管理
              </Typography>

              <Box sx={{ display: "flex", mx: "50px", mb: "30px" }}>
                <Link to="/adminhome/banneredit">
                  <Box
                    sx={{
                      width: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      height: { xs: "100px", sm: "100px", md: 150, lg: 150 },
                      textAlign: "center",
                      borderRadius: "20px",
                      border: "2px solid",
                      margin: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      p: "10px",
                      "&:hover": {
                        opacity: 0.8,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <PhotoLibraryIcon
                      sx={{ fontSize: 60, height: "60%", color: "#024098" }}
                    />
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "18px",
                          lg: "18px",
                        },
                        height: "40%",
                      }}
                    >
                      バナー編集
                    </Typography>
                  </Box>
                </Link>
              </Box>
            </Box>

            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "20px",
                  md: "24px",
                  lg: "24px",
                },
                p: "5px",
                width: "90%",
                mx: "auto",
                mb: "10px",
              }}
            >
              承認待ち一覧
            </Typography>

            <Box
              sx={{
                display: "flex",
                mx: "auto",
                justifyContent: "center",
                my: "5px",
                background: "#e0e0e0",
                width: "90%",
                "&:hover": {
                  opacity: 0.8,
                  cursor: "pointer",
                },
              }}
              onClick={moveWaitingApprovalItem}
            >
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "16px",
                    md: "18px",
                    lg: "18px",
                  },
                  p: "3px",
                  width: "15%",
                }}
              >
                2023/1/1
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "16px",
                    md: "18px",
                    lg: "18px",
                  },
                  p: "3px",
                  width: "45%",
                }}
              >
                商品名が入ります商品名が入ります商品
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "16px",
                    md: "18px",
                    lg: "18px",
                  },
                  p: "3px",
                  width: "35%",
                }}
              >
                申請者名
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                mx: "auto",
                justifyContent: "center",
                my: "5px",
                background: "#e0e0e0",
                width: "90%",
                "&:hover": {
                  opacity: 0.8,
                  cursor: "pointer",
                },
              }}
              onClick={moveWaitingApprovalItem}
            >
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "16px",
                    md: "18px",
                    lg: "18px",
                  },
                  p: "3px",
                  width: "15%",
                }}
              >
                2023/1/1
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "16px",
                    md: "18px",
                    lg: "18px",
                  },
                  p: "3px",
                  width: "45%",
                }}
              >
                商品名
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "16px",
                    md: "18px",
                    lg: "18px",
                  },
                  p: "3px",
                  width: "35%",
                }}
              >
                申請者名
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                mx: "auto",
                justifyContent: "center",
                my: "5px",
                background: "#e0e0e0",
                width: "90%",
                "&:hover": {
                  opacity: 0.8,
                  cursor: "pointer",
                },
              }}
              onClick={moveWaitingApprovalItem}
            >
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "16px",
                    md: "18px",
                    lg: "18px",
                  },
                  p: "3px",
                  width: "15%",
                }}
              >
                2023/1/1
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "16px",
                    md: "18px",
                    lg: "18px",
                  },
                  p: "3px",
                  width: "45%",
                }}
              >
                商品名
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "16px",
                    md: "18px",
                    lg: "18px",
                  },
                  p: "3px",
                  width: "35%",
                }}
              >
                申請者名
              </Typography>
            </Box>
          </Box>
        </Paper>
      </DefaultLayout>
    </>
  );
});

export default AdminHome;
