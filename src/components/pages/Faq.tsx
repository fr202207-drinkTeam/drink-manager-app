import React from "react";
import ChatBot from "react-simple-chatbot";

export const Faq = () => {
  const style = {
    width: "100%　!important",
    margin: "0 auto",
    marginTop: 0,
  };
  return (
    <div style={style}>
      <div style={{ width: "100% !important" }}>
        <ChatBot
          className="custom-chatbot"
          headerTitle="チャットbot"
          recognitionEnable={true}
          steps={[
            {
              id: "1",
              message: "質問はありますか?",
              trigger: "2",
            },
            {
              id: "2",
              user: true,
              trigger: "3",
            },
            {
              id: "3",
              message:
                "{previousValue}ですね。こちらはお問い合わせフオームをご利用ください。",
              end: true,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Faq;
