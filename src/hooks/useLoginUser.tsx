import { useRecoilState } from 'recoil';
import { loginUserState } from '../store/loginUserState';
import axios from 'axios';
import { useEffect } from 'react';
import { Users } from '../types/type';

type Props = {
  id: number;
};

export const useLoginUser = (props: Props) => {
  const { id } = props;
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);
  useEffect(() => {
    axios.get<Users>(`http://localhost:50000/user/${id}`).then((res) => {
      setLoginUserInfo(res.data);
    });
  }, [setLoginUserInfo]);

  return { loginUserInfo, setLoginUserInfo };
};
