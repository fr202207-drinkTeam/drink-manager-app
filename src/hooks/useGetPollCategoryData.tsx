import React, { useEffect, useState } from "react";
import { Polls, Questionnaire } from "../types/type";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "./useLoginUserFetch";

const useGetPollCategoryData = (id: number) => {
  const [pollData, setPollData] = useState<Polls[]>([]);

  //login
  const authId = Cookies.get("authId")!;
  // console.log(authId)
  const loginUser = useLoginUserFetch({ authId: authId });
  // console.log(loginUser.id, 11);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/polls?category=${id}`);
        const data = await response.json();
        // console.log(data, "data");
        setPollData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [loginUser.id]);

  return pollData;
};

export default useGetPollCategoryData;
