import { Paper, Typography, Box } from "@mui/material";
import { FC, memo, useState } from "react";
import { InactiveButton } from "../atoms/button/Button";
import ModalWindow from "../organisms/ModalWindow";
import { useNavigate } from "react-router-dom";
import ContactForm from "../organisms/ContactForm";

const Contact: FC = memo(() => {
  const [contactCategory, setContactCategory] = useState<string>("default");
  const [contactContents, setContactContents] = useState<string>("");

  const navigate = useNavigate();

  const onClickSubmit = async () => {
    console.log("start");
    await fetch("http://localhost:8880/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: contactCategory,
        content: contactContents,
      }),
    }).then(() => {
      navigate("/home");
    });
  };

  return (
    <Paper
      sx={{
        padding: "50px 100px",
      }}
    >
      <Box id="top" />
      <Box>
        <Typography
          variant="h3"
          borderBottom="1px solid"
          gutterBottom
          sx={{ mb: "100px" }}
        >
          お問い合わせ
        </Typography>
        <ContactForm
          setContactCategory={setContactCategory}
          contactCategory={contactCategory}
          setContactContents={setContactContents}
          contactContents={contactContents}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mb: "60px" }}>
          {contactCategory === "default" || contactContents === "" ? (
            <InactiveButton
              sxStyle={{
                px: 7,
                py: 2,
                borderRadius: "15px",
                marginTop: "32px",
                textAlign: "center",
              }}
            >
              送信
            </InactiveButton>
          ) : (
            <ModalWindow
              title="送信します、よろしいですか？"
              content={""}
              openButtonColor="blue"
              buttonName="送信"
              completeButtonColor={"blue"}
              completeButtonName={`はい`}
              completeAction={onClickSubmit}
              cancelButtonColor={"red"}
              openButtonSxStyle={{
                px: 7,
                py: 2,
                borderRadius: "15px",
                marginTop: "32px",
                textAlign: "center",
              }}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
});

export default Contact;
