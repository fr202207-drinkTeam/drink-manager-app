import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../store/loginUserState";
import { Users } from "../types/type";

type Props = {
  authId: string;
};

// export const useLoginUserFetch = (props: Props) => {
//   const { authId } = props;
//   const [loginUser, setLoginUser] = useRecoilState<Users>(loginUserState);
//   useEffect(() => {
//     fetch(`http://localhost:8880/users?authId=${authId}`)
//       .then((response) => response.json())
//       .then((user) => setLoginUser(user[0]));
//   }, [authId, setLoginUser]);
//   return loginUser;
// };

export const useLoginUserFetch = (props: Props) => {
  const { authId } = props;
  const [loginUser, setLoginUser] = useRecoilState<Users>(loginUserState);

  useEffect(() => {
    if (authId) {
      fetch(`http://localhost:50000/userauth/${authId}`)
        .then((response) => response.json())
        .then((user) => setLoginUser(user[0]));
    }
  }, [authId, setLoginUser]);

  return loginUser;
};
