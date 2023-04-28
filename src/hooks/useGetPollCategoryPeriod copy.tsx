import React, { useEffect, useState } from "react";
import { Questionnaire } from "../types/type";

const useGetPollCategoryPeriod = (id: number) => {
  const [questionnairePeriod, setQuestionnairePeriod] = useState<Questionnaire[]>([]);
  const now = new Date();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:8880/questionnaire?category=${Number(id)}`
        );
        const data = await response.json();
        // console.log(data,11111)
        const Categoryperiod = data.map((question: Questionnaire) => {
          const endDate = new Date(question.endDate);
          // const startDate = new Date(question.startDate);
          const isValidPeriod = endDate <= now;
          return {
            ...question,
            isValidPeriod: isValidPeriod,
            endDate: endDate,
          };
        });
        const validPeriodData = Categoryperiod.filter((question: any) => {
          return question.isValidPeriod;
        });
        setQuestionnairePeriod(validPeriodData)
      } catch (error) {
        console.error(error);
      }
    })();
    // console.log(questionnairePeriod,"aaa")
  }, [id]);

  return questionnairePeriod;
};

export default useGetPollCategoryPeriod;
