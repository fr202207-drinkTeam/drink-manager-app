import React from "react";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";

type PrimaryDateInputPorps={
  onChange:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  props:any
}

const PrimaryDateInput = ({onChange, ...props }: PrimaryDateInputPorps) => {
  return (
    <>
      <InputLabel id="brand-label" sx={{ mt: 2, fontWeight: "bold" }}>
        期間
      </InputLabel>
      <TextField
        variant="standard"
        sx={{ width: "200px", mb: 5 }}
        type="date"
        {...props}
        onChange={onChange}
      />
      <span
        style={{
          fontSize: "1.5rem",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        〜
      </span>
      <TextField
        type="date"
        variant="standard"
        sx={{ width: "200px", mb: 5 }}
        {...props}
        onChange={onChange}
      />
    </>
  );
};

export { PrimaryDateInput };



//使用例
// const [startDate, setStartDate] = useState("");
// const [endDate, setEndDate] = useState("");

// const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = event.target;
//   if (name === "start-date") {
//     setStartDate(value);
//   } else {
//     setEndDate(value);
//   }
// };

// return下↓
{/* <PrimaryDateInput
name="start-date"
label="開始日"
value={startDate}
onChange={handleDateChange}
/>
<PrimaryDateInput
name="end-date"
label="終了日"
value={endDate}
onChange={handleDateChange}
/> */}
