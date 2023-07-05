import  { useEffect, useState } from "react";
import { Questionnaire } from "../../types/type";

const useGetAllQuestionnaire = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire[]>([]);

  //アンケート情報取得
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:50000/questionnaires`);
      const data = await response.json();
      const period = data.map((question: Questionnaire) => {
        const endDate = new Date(question.endDate);
        const startDate = new Date(question.startDate);
        return {
          ...question,
          endDate: endDate,
          startDate: startDate,
        };
      });
      setQuestionnaire(period);
    })();
  }, []);
  return questionnaire;
};

export default useGetAllQuestionnaire;