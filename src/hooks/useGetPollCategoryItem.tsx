import React, { useEffect, useState } from "react";
import { Items, Questionnaire } from "../types/type";

const useGetPollCategoryItem = (id: number) => {
  const [items, setItems] = useState<Items[]>([]);
  const now = new Date();

  //投票期間中の商品をカテゴリごとに表示するカスタムフック
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:8880/items`);
        const itemdata = await res.json();
        setItems(itemdata);

        const response = await fetch(
          `http://localhost:8880/questionnaire?category=${Number(id)}`
        );
        const data = await response.json();
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
        const itemId = itemdata.filter((item: Items) => {
          return pollitemID?.includes(item.id);
        });
        setItems(itemId);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return items;
};

export default useGetPollCategoryItem;
