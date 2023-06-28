import  { useEffect, useState } from "react";
import { Polls } from "../types/type";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "./useLoginUserFetch";

const useGetPollCategoryData = (id: number) => {
  const [pollData, setPollData] = useState<Polls[]>([]);

  //login
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:50000/pollcategory/${id}`);
        const data = await response.json();
        setPollData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, loginUser.id]);

  return pollData;
};

export default useGetPollCategoryData;
