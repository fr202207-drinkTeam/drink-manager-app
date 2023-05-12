import  { useEffect, useState } from "react";
import { Questionnaire } from "../types/type";

const useGetAnQuestionnaire = (id:number) => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>();
    useEffect(() => {
      (async () => {
        try {
          const response = await fetch(
            `http://localhost:8880/questionnaire/${id}`
          );
          const data = await response.json();
          setQuestionnaire(data);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [id]);
  return questionnaire;
};

export default useGetAnQuestionnaire;