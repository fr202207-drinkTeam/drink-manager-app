import { Link, Paper, Typography } from "@mui/material";
import { FC, memo } from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {};

const Guide: FC<Props> = memo((props) => {
  return (
    <div>
      <Paper sx={{ p: "20px" }}>
        <Typography variant="h3" borderBottom="1px solid" gutterBottom>
          ご利用ガイド
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: "70px" }}>
          &emsp; Reactチームは、自ら運営するシステムである「Drink Manager
          App」について、以下の通りご利用ガイド(以下、本利用ガイドといいます。)を定め、社員は、あらかじめ本利用ガイドの全てに同意をした上で、社内カフェマシンを利用するものとします。
        </Typography>
        <Typography variant="h5" borderBottom="1px solid" gutterBottom>
          当システムについて
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: "40px" }}>
          &emsp; 当システムは弊社社員のみご利用可能です。
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            mb: "20px",
            fontWeight: "bolder",
            textAlign: "center",
          }}
        >
          「投票機能」
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: "40px" }}>
          &emsp;
          当システムでは、定期的に様々なアンケートを実施しております。投票は各アンケートにつき１人１回となっております。中でもカフェマシン商品の人気アンケートは、その結果によって社内に設置されているカフェマシン商品が変更となりますので、可能な限り投票のご協力をお願いいたします。
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            mb: "20px",
            fontWeight: "bolder",
            textAlign: "center",
          }}
        >
          「投稿機能」
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: "70px" }}>
          &emsp;
          社内に設置されているカフェマシン商品に対する投稿だけでなく、自由に投稿を行うことができます。さらに、投稿に対してコメントを行うことができます。ぜひコーヒーに合うおすすめのお菓子など、飲食に関することを自由に共有しましょう。またこちらのページでは、人気投票の結果によって決まる今後のカフェマシン商品のお知らせ等も確認することができます。
        </Typography>

        <Typography
          variant="h5"
          borderBottom="1px solid"
          gutterBottom
          sx={{ mb: "40px" }}
        >
          カフェマシンのご利用方法
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            mb: "20px",
            fontWeight: "bolder",
          }}
        >
          ストレート（１パック）の場合
        </Typography>
        <Typography variant="body1" gutterBottom>
          1. ドリンクのカテゴリーボタンを押します。
        </Typography>
        <Typography variant="body1" gutterBottom>
          2.
          ドリンクサイズを選択します。サイズ選択画面が表示されない場合は、スタンダードサイズで抽出されます。
        </Typography>
        <Typography variant="body1" gutterBottom>
          3. ドリンクパックをセットし、パックドアを閉めると抽出が始まります。
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: "40px" }}>
          4. 出来上がりのメッセージが表示されたら抽出完了です。
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          sx={{
            mb: "20px",
            fontWeight: "bolder",
          }}
        >
          ラテ＆カプチーノの場合
        </Typography>
        <Typography variant="body1" gutterBottom>
          1. ラテの種類別に下記ボタンを順番に押します。
        </Typography>
        <Typography variant="body2" gutterBottom>
          カフェラテ:[スペシャルメニュー]→[カフェラテ]
        </Typography>
        <Typography variant="body2" gutterBottom>
          カプチーノ:[スペシャルメニュー]→[カプチーノ]
        </Typography>
        <Typography variant="body2" gutterBottom>
          ティーラテ:[ティー]→[ティーラテ]
        </Typography>
        <Typography variant="body2" gutterBottom>
          ココアラテ:[ココアその他]→[ココアラテ]
        </Typography>
        <Typography variant="body1" gutterBottom>
          2.
          ミルクパックをセットします。パックドアを閉めると１パック目の抽出が始まります。
        </Typography>
        <Typography variant="body1" gutterBottom>
          3.
          パックドアが開いたら、コーヒー又はティーのドリンクパックをセット。パックドアを閉めると２パック目の抽出が始まります。
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: "70px" }}>
          4. 出来上がりのメッセージが表示されたら抽出完了です。
        </Typography>
        <Typography variant="h5" borderBottom="1px solid" gutterBottom>
          お問い合わせ
        </Typography>
        <Typography variant="body1" gutterBottom>
          &emsp; お問い合わせは&thinsp;
          <Link
            component={RouterLink}
            to="/home/contact"
            color={"#ea6f00"}
            sx={{ fontWeight: "bolder" }}
          >
            こちら
          </Link>
        </Typography>
      </Paper>
    </div>
  );
});

export default Guide;
