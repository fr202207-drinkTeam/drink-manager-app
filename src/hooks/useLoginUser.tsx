import { useRecoilState } from "recoil";
import { loginUserState } from "../store/loginUserState";
import axios from "axios";
import { FC, memo, useCallback, useEffect } from "react";
import { Users } from "../types/type";

type Props = {
  id: number;
};

export const useLoginUser = (props: Props) => {
  const { id } = props;
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);
  useEffect(() => {
    axios.get(`http://localhost:8880/users/${id}`).then((res) => {
      setLoginUserInfo(res.data);
    });
  }, [setLoginUserInfo]);

  return { loginUserInfo, setLoginUserInfo };
};
