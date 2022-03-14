import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//UI
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import * as utils from "./Util";
import TransactionDay from "./TransactionDay";
import "./Transaction.css";


const Transaction = () => {

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

  const leftArrowHandler = () => {
    let d = new Date(mth + " 1, " + year.toString());
    d.setMonth(d.getMonth() - 1);
    setMth(d.toLocaleString("default", { month: "long" }));
    setYear(d.getFullYear());
  };

  const rightArrowHandler = () => {
    let d = new Date(mth + " 1, " + year.toString());
    d.setMonth(d.getMonth() + 1);
    setMth(d.toLocaleString("default", { month: "long" }));
    setYear(d.getFullYear());
  };

  return (
    <div className="transaction">
      <h1>
      <IconButton onClick={leftArrowHandler}>
        <ArrowBackIosIcon sx={{ fontSize: 50 }} />
      </IconButton>
      {mth + "-" + year}
      <IconButton onClick={rightArrowHandler}>
        <ArrowForwardIosIcon sx={{ fontSize: 50 }} />
      </IconButton>
      </h1>
      {allDates.map((date) => (
        <TransactionDay
          key={date}
          date={date}
        ></TransactionDay>
      ))}
    </div>
  );
};

export default Transaction;
