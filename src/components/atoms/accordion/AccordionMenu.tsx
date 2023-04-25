import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
const AccordionMenu = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
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
          <Link
            to={{
              pathname: "/home/search",
              search: `?category=1`,
            }}
          >
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{
                borderTop: "2px dashed #ea6f00",
                borderBottom: "2px dashed #ea6f00",
              }}
            >
              ダーク（深煎り）
            </AccordionSummary>
          </Link>
          <Link
            to={{
              pathname: "/home/search",
              search: `?category=2`,
            }}
          >
            <AccordionSummary
              aria-controls="panel2a-content"
              id="medium"
              sx={{
                borderBottom: "2px dashed #ea6f00",
              }}
            >
              ミディアム（中煎り）
            </AccordionSummary>
          </Link>
          <Link
            to={{
              pathname: "/home/search",
              search: `?category=3`,
            }}
          >
            <AccordionSummary
              aria-controls="panel2a-content"
              id="light"
              sx={{
                borderBottom: "2px dashed #ea6f00",
              }}
            >
              ライト（浅煎り）
            </AccordionSummary>
          </Link>
          <Link
            to={{
              pathname: "/home/search",
              search: `?category=4`,
            }}
          >
            <AccordionSummary
              aria-controls="panel2a-content"
              id="decaffeinated"
              sx={{
                borderBottom: "2px dashed #ea6f00",
              }}
            >
              カフェインレス
            </AccordionSummary>
          </Link>
          <Link
            to={{
              pathname: "/home/search",
              search: `?category=allcoffee`,
            }}
          >
            <AccordionSummary id="allcoffee">すべてのコーヒー</AccordionSummary>
          </Link>
        </Accordion>
        <Link
          to={{
            pathname: "/home/search",
            search: `?category=5`,
          }}
        >
          <Accordion sx={{ m: 0 }}>
            <AccordionSummary id="tea">ティー</AccordionSummary>
          </Accordion>
        </Link>
        <Link
          to={{
            pathname: "/home/search",
            search: `?category=6`,
          }}
        >
          <Accordion sx={{ m: 0 }}>
            <AccordionSummary id="cocoa">ココア</AccordionSummary>
          </Accordion>
        </Link>
        <Link
          to={{
            pathname: "/home/search",
            search: `?category=7`,
          }}
        >
          <Accordion sx={{ m: 0 }}>
            <AccordionSummary id="other">その他</AccordionSummary>
          </Accordion>
        </Link>
        <Link
          to={{
            pathname: "/home/search",
            search: `?category=all`,
          }}
        >
          <Accordion sx={{ m: 0 }}>
            <AccordionSummary id="panel1a-header">
              すべての商品
            </AccordionSummary>
          </Accordion>
        </Link>
      </div>
    </>
  );
};

export default AccordionMenu;
