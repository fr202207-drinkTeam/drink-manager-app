import { FC, memo } from "react";
import LoginForm from "../atoms/login/LoginForm";

type Props = {};

const Login: FC<Props> = memo((props) => {
  return <LoginForm loginTitle="ログイン" />;
});

export default Login;
