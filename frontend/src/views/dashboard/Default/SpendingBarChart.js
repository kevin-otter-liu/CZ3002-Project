import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Chart,
  Series,
  Size,
  CommonSeriesSettings,
  Legend,
  ValueAxis,
  Title,
  Export,
  Tooltip,
  Border,
} from "devextreme-react/chart";
import service from "./data.js.old";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { getStatisticsAsyn } from "store/Transaction";

// const dataSource = service.getMaleAgeData();

const SpendingBarChart = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatisticsAsyn());
  }, []);

  const dataSource = useSelector((state) => state.transaction.statistics);

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Chart
            id="chart"
            title="Spendings Vs Avg Spendings"
            dataSource={dataSource}
          >
            <Size height={580} />
            <CommonSeriesSettings argumentField="month" type="stackedBar" />
            <Series valueField="myFood" name="Food" stack="my" />
            <Series valueField="myTransport" name="Transport" stack="my" />
            <Series valueField="myApparel" name="Apparel" stack="my" />
            <Series valueField="mySocial life" name="Social Life" stack="my" />
            <Series valueField="myHousehold" name="Household" stack="my" />
            <Series valueField="myGift" name="Gift" stack="my" />
            <Series valueField="myOthers" name="Other" stack="my" />

            <Series valueField="avgFood" name="Avg Food" stack="avg" />
            <Series
              valueField="avgTransport"
              name="Avg Transport"
              stack="avg"
            />
            <Series valueField="avgApparel" name="Avg Apparel" stack="avg" />
            <Series
              valueField="avgSocial life"
              name="Avg Social Life"
              stack="avg"
            />
            <Series
              valueField="avgHousehold"
              name="Avg Household"
              stack="avg"
            />
            <Series valueField="avgGift" name="Avg Gift" stack="avg" />
            <Series valueField="avgOthers" name="Avg Other" stack="avg" />

            <ValueAxis>
              <Title text="$" />
            </ValueAxis>
            <Legend
              position="outside"
              orientation="horizontal"
              rowCount={1}
              horizontalAlignment="center"
              verticalAlignment="bottom"
            >
              <Border visible={true} />
            </Legend>
            <Export enabled={true} />
            <Tooltip enabled={true} />
          </Chart>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default SpendingBarChart;
