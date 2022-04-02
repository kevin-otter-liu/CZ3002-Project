import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BudgetItem from "./BudgetItem";


import BudgetCard from "../Budget/BudgetCard";

//UI
import { IconButton } from "@mui/material";

import "./Budget.css";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import * as utils from "./Util";
import BudgetDay from "./BudgetDay.js";


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
    <div className="budget">
      {allDates.map((date) => (
        <BudgetDay
          key={date}
          date={date}
        ></BudgetDay>
      ))}
    </div>
  );
};

export default Budget;
