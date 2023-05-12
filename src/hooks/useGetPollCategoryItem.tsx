import  { useEffect, useState } from "react";
import { Items, Questionnaire } from "../types/type";

const useGetPollCategoryItem = (id: number) => {
  const [items, setItems] = useState<Items[]>([]);
  
  //投票期間中の商品をカテゴリごとに表示するカスタムフック
  useEffect(() => {
    (async () => {
      const now = new Date();
      try {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);//当月最初の日
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);//当月最終日
        //アイテム取得
        const res = await fetch(`http://localhost:8880/items`);
        const itemdata = await res.json();
        setItems(itemdata);
        //投票のカテゴリ取得
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
            startDate:startDate
          };
        });
        const filteredData = Categoryperiod.filter((poll: Questionnaire) => {
          const startDate = poll.startDate.getTime();
          const endDate = poll.endDate.getTime();
          return startDate >= startOfMonth.getTime() && endDate <= endOfMonth.getTime();
        });
        const sortedData = filteredData.sort((a: { endDate: { getTime: () => number; }; }, b: { endDate: { getTime: () => number; }; }) => b.endDate.getTime() - a.endDate.getTime());
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
