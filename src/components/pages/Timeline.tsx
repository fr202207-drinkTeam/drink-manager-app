import { FC, memo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import {
  CachedOutlined,
  PlaylistAdd,
} from "@mui/icons-material";
import PostForm from "../organisms/PostForm";

type Props = {};

const Timeline: FC<Props> = memo((props) => {
  return (
    <Paper sx={{ p: "20px", background: "#eae5e3" }}>
      <Grid
        container
        sx={{
          flexGrow: 1,
          borderBottom: 1,
          py: "10px",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Grid item xs={4}>
          <Typography variant="h4">タイムライン</Typography>
        </Grid>

        <Grid item xs={5}>
          <Paper
            component="form"
            elevation={0}
            sx={[
              {
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                maxWidth: "215px",
                mr: "5px",
                height: "35px",
              },
              {
                "&:hover": {
                  border: "1px solid",
                  p: "1px 3px",
                },
              },
            ]}
          >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="検索" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <Select
            size="small"
            fullWidth
            defaultValue="すべて"
            sx={{ border: "none", backgroundColor: "white" }}
          >
            <MenuItem key="1" value="すべて">
              すべて
            </MenuItem>
            <MenuItem key="2" value="投稿">
              投稿
            </MenuItem>
            <MenuItem key="3" value="お知らせ">
              お知らせ
            </MenuItem>
          </Select>
        </Grid>
        <Grid item xs={1} sx={{ p: "none" }}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              sx={{
                background: "#89c3eb",
                color: "white",
                borderRadius: "none",
              }}
            >
              <CachedOutlined />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ overflowY: "scroll", height: "1000px", px: "20px" }}>
        <PostForm />

        <Paper elevation={3} sx={{ mt: 2, height: "auto", py: "3px" }}>
          <Box sx={{ borderBottom: "1px solid", mx: "5px" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bolder", color: "blue" }}
            >
              rakuco
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="body2">2023/04/18 16:09</Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ background: "#eae5e3", mr: "10px", px: "3px" }}
              >
                投稿
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                新年度を迎えるにあたって 中村社長から届いたコチラのメッセージ
                もうご覧になりましたか？▼ https://rakuplus.jp/archives/13267
                売上増に在籍人数の拡大、 そして
                『日本を代表する企業への最終ステップ となる国内トップ200企業！』
                というビジョン これが、 これから3年間で実現できたら、
                本当にすごいですよね！ rakucoもこのまま、
                会社と共に成長していきたいです！
                今年度も一緒に頑張っていきましょうね！
              </Typography>
            </Box>
          </Box>
          <Box>
            <Paper
              component="form"
              elevation={0}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                m: "5px",
                height: "35px",
              }}
            >
              <Grid container alignItems="center" spacing={5}>
                <Grid item xs={7}>
                  <InputBase
                    sx={{ flex: 1, border: "1px solid" }}
                    placeholder="コメント"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={2}>
                  <Button
                    size="small"
                    type="submit"
                    sx={{ color: "white", background: "#89c3eb", m: "10px" }}
                  >
                    コメント
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    size="small"
                    type="submit"
                    sx={{ color: "gray", m: "10px" }}
                  >
                    <PlaylistAdd />
                    コメント表示
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Box sx={{ display: "flex", m: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bolder", color: "blue" }}
                  >
                    rakuco
                  </Typography>
                  <Typography variant="body2">2023/04/18 16:09</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">こんにちは</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", m: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bolder", color: "blue" }}
                  >
                    rakuco
                  </Typography>
                  <Typography variant="body2">2023/04/18 16:09</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">こんにちは</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ mt: 2, height: "auto", py: "3px" }}>
          <Box sx={{ borderBottom: "1px solid", mx: "5px" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bolder", color: "blue" }}
            >
              rakuco
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="body2">2023/04/18 16:09</Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ background: "#eae5e3", mr: "10px", px: "3px" }}
              >
                投稿
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                新年度を迎えるにあたって 中村社長から届いたコチラのメッセージ
                もうご覧になりましたか？▼ https://rakuplus.jp/archives/13267
                売上増に在籍人数の拡大、 そして
                『日本を代表する企業への最終ステップ となる国内トップ200企業！』
                というビジョン これが、 これから3年間で実現できたら、
                本当にすごいですよね！ rakucoもこのまま、
                会社と共に成長していきたいです！
                今年度も一緒に頑張っていきましょうね！
              </Typography>
            </Box>
          </Box>
          <Box>
            <Paper
              component="form"
              elevation={0}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                m: "5px",
                height: "35px",
              }}
            >
              <Grid container alignItems="center" spacing={5}>
                <Grid item xs={7}>
                  <InputBase
                    sx={{ flex: 1, border: "1px solid" }}
                    placeholder="コメント"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={2}>
                  <Button
                    size="small"
                    type="submit"
                    sx={{ color: "white", background: "#89c3eb", m: "10px" }}
                  >
                    コメント
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    size="small"
                    type="submit"
                    sx={{ color: "gray", m: "10px" }}
                  >
                    <PlaylistAdd />
                    コメント表示
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Box sx={{ display: "flex", m: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bolder", color: "blue" }}
                  >
                    rakuco
                  </Typography>
                  <Typography variant="body2">2023/04/18 16:09</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">こんにちは</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", m: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bolder", color: "blue" }}
                  >
                    rakuco
                  </Typography>
                  <Typography variant="body2">2023/04/18 16:09</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">こんにちは</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ mt: 2, height: "auto", py: "3px" }}>
          <Box sx={{ borderBottom: "1px solid", mx: "5px" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bolder", color: "blue" }}
            >
              rakuco
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="body2">2023/04/18 16:09</Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ background: "#eae5e3", mr: "10px", px: "3px" }}
              >
                投稿
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                新年度を迎えるにあたって 中村社長から届いたコチラのメッセージ
                もうご覧になりましたか？▼ https://rakuplus.jp/archives/13267
                売上増に在籍人数の拡大、 そして
                『日本を代表する企業への最終ステップ となる国内トップ200企業！』
                というビジョン これが、 これから3年間で実現できたら、
                本当にすごいですよね！ rakucoもこのまま、
                会社と共に成長していきたいです！
                今年度も一緒に頑張っていきましょうね！
              </Typography>
            </Box>
          </Box>
          <Box>
            <Paper
              component="form"
              elevation={0}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                m: "5px",
                height: "35px",
              }}
            >
              <Grid container alignItems="center" spacing={5}>
                <Grid item xs={7}>
                  <InputBase
                    sx={{ flex: 1, border: "1px solid" }}
                    placeholder="コメント"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={2}>
                  <Button
                    size="small"
                    type="submit"
                    sx={{ color: "white", background: "#89c3eb", m: "10px" }}
                  >
                    コメント
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    size="small"
                    type="submit"
                    sx={{ color: "gray", m: "10px" }}
                  >
                    <PlaylistAdd />
                    コメント表示
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Box sx={{ display: "flex", m: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bolder", color: "blue" }}
                  >
                    rakuco
                  </Typography>
                  <Typography variant="body2">2023/04/18 16:09</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">こんにちは</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", m: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bolder", color: "blue" }}
                  >
                    rakuco
                  </Typography>
                  <Typography variant="body2">2023/04/18 16:09</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">こんにちは</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
});

export default Timeline;
