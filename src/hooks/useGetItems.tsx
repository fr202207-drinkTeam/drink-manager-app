import { useEffect, useState } from "react";
import { Items } from "../types/type";
import axios from "axios";

const useGetItems = (
  params: string = "",
  trigger: string | number | null = null
) => {
  const [itemData, setItemData] = useState<Items[]>([]);
  const [itemLoading, setitemLoading] = useState<boolean>(false);
  const [itemError, setitemError] = useState<boolean>(false);

  useEffect(() => {
    setitemLoading(true);
    axios
      .get(`http://localhost:8880/items${params}`)
      .then((res) => {
        setItemData(res.data);
        setitemLoading(false);
      })
      .catch(() => {
        setitemError(true);
        setitemLoading(false);
      });
  }, [params, trigger]);

  return { itemData, itemLoading, itemError };
};

export default useGetItems;
