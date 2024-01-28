import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import moment from "moment";

import {getRandomNumber} from "../../helpers/utils";

const labels = moment.monthsShort();
const labelsColors = labels.map(() =>`${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}`)

const dateMock = {
    labels,
    datasets: [{
        data: labels.map(() => getRandomNumber(0, 30)),
        backgroundColor: labelsColors.map(color => `rgba(${color}, 0.7)`),
        borderColor: labelsColors.map(color => `rgba(${color}, 1)`),
        hoverOffset: 32,
    }],
}

const optionsMock = {
    cutout: '50%',
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
        },
        title: {
            display: true,
            text: 'Chart.js Doughnut Chart',
            color: '#4b5563',
            font: {
                size: 24,
            },
        },
    },
};

const DoughnutChart = ({ data = dateMock, options = optionsMock }) => {
    return <Doughnut data={data} options={options} height={'100%'} width={'150%'}/>;
};

export default DoughnutChart;
