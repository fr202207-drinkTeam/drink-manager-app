import React, { useEffect, useState } from "react";
// import { Questionnaire } from '../types/type';


const useGetPollCategory = ( id :number) => {
  const [questionnaireCategory, setQuestionnaireCategory] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:8880/questionnaire?category=${Number(id)}`
        );
        const data = await response.json();
        setQuestionnaireCategory(data);
        console.log(data,"data")
        console.log(questionnaireCategory,"data")
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return questionnaireCategory;
};

export default useGetPollCategory;
