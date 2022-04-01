import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



import BudgetCard from "../Budget/BudgetCard";

//UI
import { IconButton } from "@mui/material";

import "./Budget.css";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import * as utils from "./Util";


const Budget = () => {

  let today = new Date(); 
  const [mth, setMth] = useState(
    today.toLocaleString("default", { month: "long" })
  );
  const [year, setYear] = useState(today.getFullYear());
  const [allDates, setAllDates] = useState([]);

  useEffect(() => {
    const dates = utils.getDates(mth, year);
    setAllDates(dates);
  }, [mth, year]);


  return (
    <>
      <Container>
        <Stack direction="horizontal" gap="1" className="mb-4">

        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          
        </div>
      </Container>
    </>
  )
};

export default Budget;
