import React from 'react';
import moment from "moment";
import {Bar} from 'react-chartjs-2';
import {getRandomNumber} from "../../helpers/utils";

const labels = moment.monthsShort();

const dataMock = {
    labels,
    datasets: [
        {
            label: 'Sales 1',
            data: labels.map(() => getRandomNumber(-10, 30)),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderRadius: 10,
        },

        {
            label: 'Sales 2',
            data: labels.map(() => getRandomNumber(-10, 30)),
            backgroundColor: 'rgba(192, 75, 192, 0.6)',
            borderColor: 'rgba(192, 75, 192, 1)',
            borderWidth: 1,
            borderRadius: 10,
        },
    ],
};

const optionsMock = {
    responsive: true,
    plugins: {
        customCanvasBackgroundColor: {
            color: 'white',
        },
        legend: {
            position: 'top',
            labels: {
                font: {
                    size: 16,
                    weight: 'bold',
                },
                generateLabels: (chart) => {
                    const dataset = chart.data.datasets;
                    return dataset.map(({ label, backgroundColor, borderColor }) => {
                        return {
                            text: label,
                            fillStyle: backgroundColor,
                            strokeStyle: borderColor,
                            fontColor: '#4b5563',
                        };
                    });
                }
                },
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
            color: '#4b5563',
            font: {
                size: 24,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
        },
        x: {
            ticks: {
                color: '#4b5563',
                font: {
                    weight: 'bold',
                },
            },
            grid: {
                color: 'rgba(0, 0, 0, 0)',
            },
        },
    },
};

const BarChart = ({ data = dataMock, options = optionsMock }) => {
        return <Bar data={data} options={options} />;
};

export default BarChart;
