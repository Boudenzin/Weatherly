import React from 'react';
import './WeatherChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const WeatherChart = ({ dadosPrevisao }) => {
    if (!dadosPrevisao || !dadosPrevisao.list) {
        return <div>Carregando gráfico...</div>;
    }

    const intervals = dadosPrevisao.list.slice(0, 5);
    const labels = intervals.map(item => {
        const horaCompleta = item.dt_txt.split(" ")[1]; // Exemplo: "15:00:00"
        return horaCompleta.substring(0, 5); // Retorna "15:00"
    });
    const temperatures = intervals.map(item => item.main.temp);

    const data = {
        labels,
        datasets: [
            {
                label: 'Temperatura',
                data: temperatures,
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default WeatherChart;