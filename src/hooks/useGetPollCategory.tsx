import React, { useEffect, useState } from "react";
import { Items, Questionnaire } from "../types/type";
// import { Questionnaire } from '../types/type';

const useGetPollCategory = (id: number) => {
  // const [questionnaireCategory, setQuestionnaireCategory] = useState<any>([]);
  const [items, setItems] = useState<Items[]>([]);
  const now = new Date();
 
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:8880/items`);
        const itemdata = await res.json();
        setItems(itemdata);

        console.log(itemdata,111)

        const response = await fetch(
          `http://localhost:8880/questionnaire?category=${Number(id)}`
        );
        const data = await response.json();
        // setQuestionnaireCategory(data);

        const Categoryperiod = data.map((question: Questionnaire) => {
          const endDate = new Date(question.endDate);
          const startDate = new Date(question.startDate);
          const isValidPeriod = startDate < now && endDate >= now;
          return {
            ...question,
            isValidPeriod: isValidPeriod,
            endDate: endDate,
          };
        });
        
        const sortedData = Categoryperiod.sort(
          (after: any, before: any) => before.endDate - after.endDate
        );

        const pollitemID = sortedData[0]?.polledItems.map(
          (poll: { itemId: any }) => {
            return poll.itemId;
          }
        );
        console.log(pollitemID,999)
        console.log(items,"ccc")

        const itemId = itemdata.filter((item:Items) =>{
          console.log(item,"aaa")
        return  pollitemID?.includes(item.id);
        })
        console.log(itemId,777)
        setItems(itemId);

      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  

  return items;


};

export default useGetPollCategory;
