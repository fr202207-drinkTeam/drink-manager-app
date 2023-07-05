import { Polls } from "../types/type";

  //投票結果集計
  export const CountPolls=(polls:Polls[],id:number)=>{
    const pollCounts: any = {};
    polls.forEach((item) => {
      if (item.questionnaireId === Number(id)) {
        if (pollCounts[item.result]) {
          pollCounts[item.result]++;
        } else {
          pollCounts[item.result] = 1;
        }
      }
    });
    return pollCounts
  }