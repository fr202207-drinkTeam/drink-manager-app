import React, { useEffect, useState } from "react";
import { Questionnaire } from "../types/type";

const useGetPollLatestTitle = () => {
  const [pollTitle, setPollTitle] = useState<Questionnaire[]>([]);
  const [startPeriodDate, setStartPeriodDate] = useState("");
  const [endPeriodDate, setEndPeriodDate] = useState("");
  const now = new Date();
  useEffect(() => {
    //startdateが超えていたら
    (async () => {
      const response = await fetch(`http://localhost:8880/questionnaire`);
      const data = await response.json();
      const period = data.map((question: Questionnaire) => {
        const endDate = new Date(question.endDate);
        const startDate = new Date(question.startDate);
        const isValidPeriod = endDate < now;
        return {
          ...question,
          isValidPeriod: isValidPeriod,
          endDate: endDate,
          startDate: startDate,
        };
      });
      const validPeriodData = period.filter((question: any) => {
        return question.isValidPeriod;
      });
      if (startPeriodDate !== "" && endPeriodDate !== "") {
        const periodData = validPeriodData.filter((date: Questionnaire) => {
          return (
            date.startDate >= new Date(startPeriodDate) &&
            date.endDate <= new Date(endPeriodDate)
          );
        });
        setPollTitle(periodData);
      }
    })();
  }, [startPeriodDate, endPeriodDate, now]);
  return pollTitle;
};

export default useGetPollLatestTitle;
