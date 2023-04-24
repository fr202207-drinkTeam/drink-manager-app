import { FC, memo } from "react";
import LoginForm from "../login/LoginForm";

type Props = {};

const AdminLogin: FC<Props> = memo((props) => {
  return <LoginForm loginTitle="管理者ログイン" />;
});

export default AdminLogin;
