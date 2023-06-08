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
        padding: {xs: "20px 20px", sm: "30px 30px", md: "50px 50px", lg: "50px 50px"},
      }}
    >
      <Box id="top" />
      <Box>
        <Typography
          variant="h2"
          borderBottom="1px solid"
          gutterBottom
          sx={{ mb: {xs: "30px", sm: "50px", md: "60px", lg: "60px"}, fontSize: {xs: "20px", sm: "20px", md: "28px", lg: "28px"}, fontWeight: 500 }}
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
                px: {xs: 2, sm:3, md: 5, lg:5},
                py: {xs: 1, sm:1, md: 2, lg:2},
                borderRadius: "10px",
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
                px: {xs: 2, sm:3, md: 5, lg:5},
                py: {xs: 1, sm:1, md: 2, lg:2},
                borderRadius: "10px",
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
