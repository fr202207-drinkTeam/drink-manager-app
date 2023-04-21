import { FC, memo } from "react";
import ModalWindow from "../organisms/ModalWindow";

type Props = {};

const Timeline: FC<Props> = memo((props) => {
  return (
    <div>
      <ModalWindow
      title="投稿"
      content="投稿します。よろしいですか？"
      openButtonColor="blue"
      openButtonSxStyle={{pb: '100px'}}
      completeButtonColor="blue"
      completeButtonName="投稿"
      completeAction={() => {
        console.log("complete");
      }}
      cancelButtonColor="orange"
    />
    <ModalWindow
      title="投稿削除"
      content="投稿を削除します。よろしいですか？"
      openButtonColor="red"
      completeButtonColor="blue"
      completeButtonName="削除"
      completeAction={() => {
        console.log("delete");
      }}
      cancelButtonColor="pink"
    />
    </div>
  );
});

export default Timeline;
