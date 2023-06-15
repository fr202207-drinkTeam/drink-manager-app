import  { useEffect, useState } from "react";
import { Questionnaire } from "../types/type";

const useGetPollCategoryPeriod = (id: number) => {
  const [questionnairePeriod, setQuestionnairePeriod] = useState<Questionnaire[]>([]);
  
  useEffect(() => {
    (async () => {
      const now = new Date();
      try {
        const response = await fetch(
          `http://localhost:50000/questionnaires/${Number(id)}`//API書き換え
        );
        const data = await response.json();
        // console.log(data,11111)
        const Categoryperiod = data.map((question: Questionnaire) => {
          const endDate = new Date(question.endDate);
          const startDate = new Date(question.startDate);
          // const startDate = new Date(question.startDate);
          const isValidPeriod = endDate < now;
          return {
            ...question,
            isValidPeriod: isValidPeriod,
            endDate: endDate,
            startDate: startDate,
          };
        });
        const validPeriodData = Categoryperiod.filter((question: any) => {
          return !question.isValidPeriod;
        });
        setQuestionnairePeriod(validPeriodData)
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return questionnairePeriod;
};

export default useGetPollCategoryPeriod;

