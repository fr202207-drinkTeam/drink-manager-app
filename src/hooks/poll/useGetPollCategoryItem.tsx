import { useEffect, useState } from "react";
import { Items, Questionnaire } from "../../types/type";
import useGetAllItem from "../useGetAllItems";

//itemsidとquestionnaireのitemIdで一致した商品を取得.
const useGetPollCategoryItem = (id: number) => {
  const [items, setItems] = useState<Items[]>([]);
  const[trigger,setTrigger]=useState(false);
  const itemData=useGetAllItem(trigger)
  useEffect(() => {
    (async () => {
      try {
        //投票のカテゴリ取得
        const response = await fetch(
          `http://localhost:50000/questionnaires/${Number(id)}`
        );
        const data = await response.json();
        const Categoryperiod = data.map((question: Questionnaire) => ({
          ...question,
          startDate: new Date(question.startDate).setHours(0, 0, 0, 0),
          endDate: new Date(question.endDate).setHours(0, 0, 0, 0),
        }));
        const pollitemID = Categoryperiod[0]?.Polleditems?.map((poll: any) => poll.itemId);
        setTrigger(!trigger);
        const itemId = itemData.filter((item: Items) => pollitemID?.includes(item.id));
        setItems(itemId);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id,trigger]);
  return items;
};

export default useGetPollCategoryItem;
