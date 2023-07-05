import  { useEffect, useState } from "react";
import { Polls } from "../../types/type";

const useGetPollCategoryData = (id: number) => {
  const [pollData, setPollData] = useState<Polls[]>([]);

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
  }, [id]);

  return pollData;
};

export default useGetPollCategoryData;
