import { FC, memo } from "react";
import ModalWindow from "../organisms/ModalWindow";

type Props = {};

const Timeline: FC<Props> = memo((props) => {
  return (
    <div>
      <ModalWindow
      title="投稿"
      content="投稿します。よろしいですか？"
      openButtonColor="beige"
      openButtonSxStyle={{pb: '50px'}}
      completeButtonColor="beige"
      completeButtonName="投稿"
      completeAction={() => {
        console.log("complete2");
      }}
      cancelButtonColor="pink"
    />
    <ModalWindow
      title="投稿削除"
      content="投稿を削除します。よろしいですか？"
      openButtonColor="red"
      completeButtonColor="red"
      completeButtonName="削除"
      completeAction={() => {
        console.log("delete2");
      }}
      cancelButtonColor="pink"
    />
    </div>
  );
});

export default Timeline;
