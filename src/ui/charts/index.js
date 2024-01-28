import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip, ArcElement} from 'chart.js';
import {pluginCustomCanvasBackgroundColor} from "./plugins";
import BarChart from "./Bar";
import DoughnutChart from "./Doughnut";

ChartJS.register(
    pluginCustomCanvasBackgroundColor,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export {
    BarChart,
    DoughnutChart,
}