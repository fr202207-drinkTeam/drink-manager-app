import React, { useEffect, useState } from "react";
import { Questionnaire } from "../types/type";

const useGetPollLatestTitle = (id: number) => {
  const [popularPollTitle, setPopularPollTitle] = useState<Questionnaire[]>([]);
  const [othersPollTitle, setOthersPollTitle] = useState<Questionnaire[]>([]);
  // const now = new Date();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/questionnaire?category=${Number(id)}`);
        const data = await response.json();
        const dateFilteredData = data.map((poll: Questionnaire) => {
          return {
            ...poll,
            startDate: new Date(poll.startDate),
            endDate: new Date(poll.endDate),
          };
        });
        const sortedData = dateFilteredData.sort(
          (after: { endDate: number }, before: { endDate: number }) =>
            before.endDate - after.endDate
        );
        if(id===1){
          setPopularPollTitle(sortedData);
        }else{
          setOthersPollTitle(sortedData);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  if (id === 1) {
    return popularPollTitle;
  } else {
    return othersPollTitle;
  }

};

export default useGetPollLatestTitle;
