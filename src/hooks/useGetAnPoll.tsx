import  { useEffect, useState } from "react";
import { Polls } from "../types/type";

const useGetAnPoll = (id: number) => {
  const [polls, setPolls] = useState<Polls[]>([]);

 //poll取得
 useEffect(() => {
  (async () => {
    try {
      const response = await fetch(
        `http://localhost:8880/polls?questionnaireId=${id}`
      );
      const data = await response.json();
      setPolls(data);
    } catch (error) {
      console.error(error);
    }
  })();
}, [id]);

  return polls;
};

export default useGetAnPoll;