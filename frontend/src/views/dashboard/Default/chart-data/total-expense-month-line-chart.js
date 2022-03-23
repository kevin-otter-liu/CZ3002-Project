// ===========================|| DASHBOARD - TOTAL EXPENSE YEAR CHART ||=========================== //

import { Summarize, TouchApp } from "@mui/icons-material";

const chartData = {
    type: 'line',
    height: 90,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: 'Total Expense'
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'Month',
            data: [35, 44, 9, 54, 45, 66, 41, 69,50,98,68,120]
            
        }
    ]
};

export default chartData;
