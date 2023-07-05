import { useEffect, useState } from "react";
import { Questionnaire } from "../../types/type";

const useGetQuestionnaireCategoryData = (id: number) => {
  const [latestPollTitle, setLatestPollTitle] = useState<Questionnaire[]>([]);
  
  useEffect(() => {
    // 現在開催中の投票をカテゴリごとに取得
    (async () => {
      try {
        const response = await fetch(`http://localhost:50000/questionnaires/${Number(id)}`);
        const data = await response.json();
        const dateFilteredData = data.map((poll: Questionnaire) => {
          const startDate = new Date(poll.startDate);
          const endDate = new Date(poll.endDate);
          startDate.setHours(0, 0, 0, 0); 
          endDate.setHours(0, 0, 0, 0); 
          return {
            ...poll,
            startDate,
            endDate,
          };
        });
        setLatestPollTitle(dateFilteredData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return latestPollTitle;
};

export default useGetQuestionnaireCategoryData;
