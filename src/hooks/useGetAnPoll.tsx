import  { useEffect, useState } from "react";
import { Polls } from "../types/type";

const useGetAnPoll = (id: number) => {
  const [polls, setPolls] = useState<Polls[]>([]);

 //poll取得
 useEffect(() => {
  (async () => {
    try {
      const response = await fetch(
        `http://localhost:50000/pollsdata/${id}`
      );
      const data = await response.json();
      setPolls(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  })();
}, [id]);

  return polls;
};

export default useGetAnPoll;