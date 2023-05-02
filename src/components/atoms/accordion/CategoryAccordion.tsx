import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
const CategoryAccordion = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel: any) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleAccordionClick = (category: string | number) => {
    navigate(`/home/search?category=${category}&page=1`);
  };

  return (
    <>
      <div>
        <Box>
          <Typography variant="h5" textAlign="center" sx={{ color: "#ea6f00" }}>
            - PRODUCTS -
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mb: 4, color: "#ea6f00" }}
          >
            商品一覧
          </Typography>
        </Box>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            コーヒー
          </AccordionSummary>
          <AccordionSummary
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              borderTop: "2px dashed #e3e4e5",
              borderBottom: "2px dashed #e3e4e5",
            }}
            onClick={() => handleAccordionClick("1")}
          >
            └ダーク（深煎り）
          </AccordionSummary>
          <AccordionSummary
            aria-controls="panel2a-content"
            id="medium"
            sx={{
              borderBottom: "2px dashed #e3e4e5",
            }}
            onClick={() => handleAccordionClick("2")}
          >
            └ミディアム（中煎り）
          </AccordionSummary>
          <AccordionSummary
            aria-controls="panel2a-content"
            id="light"
            sx={{
              borderBottom: "2px dashed #e3e4e5",
            }}
            onClick={() => handleAccordionClick("3")}
          >
            └ライト（浅煎り）
          </AccordionSummary>
          <AccordionSummary
            aria-controls="panel2a-content"
            id="decaffeinated"
            sx={{
              borderBottom: "2px dashed #e3e4e5",
            }}
            onClick={() => handleAccordionClick("4")}
          >
            └カフェインレス
          </AccordionSummary>
        </Accordion>
        <Accordion
          disableGutters
          onClick={() => handleAccordionClick("5")}
          sx={{ m: 0, "&.Mui-expanded::before": { opacity: "1 !important" } }}
        >
          <AccordionSummary id="tea">ティー</AccordionSummary>
        </Accordion>
        <Accordion
          sx={{ m: 0, "&.Mui-expanded::before": { opacity: "1 !important" } }}
          disableGutters
          onClick={() => handleAccordionClick("6")}
        >
          <AccordionSummary id="cocoa">ココア</AccordionSummary>
        </Accordion>
        <Accordion
          sx={{
            m: 0,
            "&.Mui-expanded::before": { opacity: "1 !important" },
          }}
          disableGutters
          onClick={() => handleAccordionClick("7")}
        >
          <AccordionSummary id="other">その他</AccordionSummary>
        </Accordion>
        <Accordion
          sx={{
            m: 0,
            "&.Mui-expanded::before": { opacity: "1 !important" },
          }}
          disableGutters
          onClick={() => handleAccordionClick("all")}
        >
          <AccordionSummary id="all">すべて</AccordionSummary>
        </Accordion>
      </div>
    </>
  );
};
export default CategoryAccordion;
