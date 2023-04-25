import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../store/loginUserState";
import { Users } from "../types/type";

type Props = {
  authId: string;
};

export const useLoginUserFetch = (props: Props) => {
  const { authId } = props;
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  useEffect(() => {
    fetch(`http://localhost:8880/users?authId=${authId}`)
      .then((response) => response.json())
      .then((user) => setLoginUser(user));
  }, [authId, setLoginUser]);
  return { loginUser };
};

// export const useLoginUserFetch = (props: Props) => {
//   const { authId } = props;
//   const [loginUser, setLoginUser] = useRecoilState<Users>(loginUserState);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const UserFetch = async () => {
//       setIsLoading(true);
//       await fetch(`http://localhost:8880/users?authId=${authId}`)
//         .then((response) => response.json())
//         .then((user) => setLoginUser(user));
//       setIsLoading(false);
//     };
//     UserFetch();
//   }, [authId, setLoginUser]);

//   return isLoading ? undefined : loginUser;
// };
