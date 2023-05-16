import { FC, memo } from "react";
import LoginForm from "../organisms/LoginForm";

type Props = {};

const Login: FC<Props> = memo((props) => {
  return <LoginForm loginTitle="ログイン" />;
});

export default Login;
