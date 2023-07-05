import  { useEffect, useState } from "react";
import { Questionnaire } from "../../types/type";

const useGetPollCategoryPeriod = (id: number) => {
  const [questionnairePeriod, setQuestionnairePeriod] = useState<Questionnaire[]>([]);
  
  // 投票登録の重複チェックで使用→現在以降の投票を取得
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:50000/questionnairesperiod/${Number(id)}`
        );
        const data = await response.json();
        const parsedData = data.map((question: Questionnaire) => ({
          ...question,
          endDate: new Date(question.endDate),
          startDate: new Date(question.startDate),
        }));
        setQuestionnairePeriod(parsedData)
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return questionnairePeriod;
};

export default useGetPollCategoryPeriod;

