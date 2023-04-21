import { useState, useEffect } from 'react';

type Props = {
  intheOffice: boolean;
};

const useGetOfficeItems = (props: Props) => {
  const [itemData, setItemData] = useState<any>();

  useEffect(() => {
    if (!props) return;
    fetch(`http://localhost:8880/items?intheOffice=${props.intheOffice}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setItemData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [props.intheOffice]);

  return  itemData ;
};

export default useGetOfficeItems;
