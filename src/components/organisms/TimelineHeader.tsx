import React, { FC, memo } from "react";
import {
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// 投稿検索処理、投稿絞込み処理、投稿取得ボタン
type Props = {
  searchPost: (event: React.FormEvent<HTMLFormElement>) => void;
  filterPosts: (event: SelectChangeEvent<string>) => void;
  fetchPostsButton: JSX.Element;
  searchError: boolean;
};

// タイムラインヘッダー
const TimelineHeader: FC<Props> = memo((props) => {
  const { searchPost, filterPosts, fetchPostsButton, searchError } = props;

  // 検索入力コンポーネント　レスポンシブ対応
  const SearchInput = (small: boolean) => (
    <Grid
      item
      xs={12}
      sm={4}
      sx={{
        display: {
          xs: `${small ? "block" : "none"}`,
          sm: `${small ? "none" : "block"}`,
        },
      }}
    >
      <Paper
        component="form"
        onSubmit={searchPost}
        elevation={0}
        sx={[
          {
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            maxWidth: "350px",
            mx: `${small ? "auto" : "10px"}`,
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
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="検索" id="postSearch" />
        <IconButton type="submit" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
  );

  return (
    <Grid sx={{ borderBottom: 1 }}>
      <Grid item sx={{ display: { xs: "block", sm: "none" } }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontSize: "30px",
          }}
        >
          タイムライン
        </Typography>
      </Grid>
      <Grid
        container
        sx={{
          flexGrow: 1,
          py: "10px",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        id="top"
      >
        {SearchInput(true)}
        <Grid item xs={5} sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography variant="h4">タイムライン</Typography>
        </Grid>

        {SearchInput(false)}

        <Grid
          item
          xs={9}
          sm={2}
          sx={{
            pt: { xs: "15px", sm: 0 },
          }}
        >
          <Select
            size="small"
            name="selectPostCategory"
            fullWidth
            defaultValue="すべて"
            sx={{ border: "none", backgroundColor: "white", px: "10px" }}
            onChange={filterPosts}
          >
            <MenuItem value="すべて">すべて</MenuItem>
            <MenuItem value="投稿">投稿</MenuItem>
            <MenuItem value="お知らせ">お知らせ</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3} sm={1} sx={{ pt: { xs: "15px", sm: 0 } }}>
          {fetchPostsButton}
        </Grid>
      </Grid>
      {searchError && (
        <Typography
          variant="body1"
          sx={{
            backgroundColor: "pink",
            mb: "10px",
            borderRadius: "3px",
            mx: "20px",
          }}
        >
          投稿検索は20文字以内で入力してください
        </Typography>
      )}
    </Grid>
  );
});

export default TimelineHeader;
