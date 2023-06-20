import  { useEffect, useState } from "react";
import { Questionnaire } from "../types/type";

const useGetAnQuestionnaire = (id:number) => {
  const [questionnaire, setQuestionnaire] = useState<any>();
    useEffect(() => {
      (async () => {
        try {
          const response = await fetch(
            `http://localhost:50000/questionnairesresult/${id}`
          );
          const data = await response.json();
          setQuestionnaire(data[0]);
          // console.log(data,"data")
        } catch (error) {
          console.error(error);
        }
      })();
    }, [id]);
  return questionnaire;
};

export default useGetAnQuestionnaire;