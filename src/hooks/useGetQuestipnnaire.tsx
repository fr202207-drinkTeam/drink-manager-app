import  { useEffect, useState } from "react";
import { Questionnaire } from "../types/type";

const useGetQuestionnaire = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire[]>([]);

  //アンケート情報取得
  useEffect(() => {
    const now = new Date();
    (async () => {
      const response = await fetch(`http://localhost:8880/questionnaire`);
      const data = await response.json();
      console.log(data, "");
      const period = data.map((question: Questionnaire) => {
        const endDate = new Date(question.endDate);
        const startDate = new Date(question.startDate);
        const isValidPeriod = endDate < now;
        return {
          ...question,
          isValidPeriod: isValidPeriod,
          endDate: endDate,
          startDate: startDate,
        };
      });
      const validPeriodData = period.filter((question: any) => {
        return !question.isValidPeriod;
      });
      setQuestionnaire(validPeriodData);
    })();
  }, []);
  return questionnaire;
};

export default useGetQuestionnaire;