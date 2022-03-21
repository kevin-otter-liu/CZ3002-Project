// ===========================|| DASHBOARD - TOTAL EXPENSE WEEK CHART ||=========================== //

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
            name: 'Last Week',
            data: [45, 66, 41, 89, 25, 44, 9]
        }
    ]
};

export default chartData;
