import { useEffect, useState } from "react";
import { Questionnaire } from "../types/type";

const useGetPollLatestTitle = (id: number) => {
  const [latestPollTitle, setLatestPollTitle] = useState<Questionnaire[]>([]);
  
  useEffect(() => {
    // 当月の最新投票を持ってくる
    (async () => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 当月最初の日
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // 当月最終日
      try {
        const response = await fetch(`http://localhost:50000/questionnaires/${Number(id)}`);//API接続OK
        const data = await response.json();
        const dateFilteredData = data.map((poll: Questionnaire) => {
          const startDate = new Date(poll.startDate);
          startDate.setHours(0, 0, 0, 0); 
          const endDate = new Date(poll.endDate);
          endDate.setHours(0, 0, 0, 0); 
          return {
            ...poll,
            startDate,
            endDate,
          };
        });
        const filteredData = dateFilteredData.filter((poll: Questionnaire) => {
          const startDate = poll.startDate.getTime();
          const endDate = poll.endDate.getTime();
          return startDate >= startOfMonth.getTime() && endDate <= endOfMonth.getTime();
        });
        const sortedData = filteredData.sort((a: { endDate: { getTime: () => number; }; }, b: { endDate: { getTime: () => number; }; }) => b.endDate.getTime() - a.endDate.getTime());
        setLatestPollTitle(sortedData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return latestPollTitle;
};

export default useGetPollLatestTitle;
