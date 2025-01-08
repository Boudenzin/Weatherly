import React from 'react';
import './WeatherChart.css';

// Importa o componente Line do pacote react-chartjs-2
import { Line } from 'react-chartjs-2';

// Importa os elementos necessários do pacote Chart.js
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registra os componentes necessários do ChartJS (obrigatório para inicializar o gráfico corretamente)
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const WeatherChart = ({ dadosPrevisao }) => {
    if (!dadosPrevisao || !dadosPrevisao.list) {
        return <div>Carregando gráfico...</div>;
    }

    // Filtra os dados para exibir apenas os próximos 5 intervalos de tempo
    const intervals = dadosPrevisao.list.slice(0, 5);
    const labels = intervals.map(item => {
        const horaCompleta = item.dt_txt.split(" ")[1]; // Exemplo: "15:00:00"
        return horaCompleta.substring(0, 5); // Retorna "15:00"
    });
    const temperatures = intervals.map(item => item.main.temp);

    // Configuração dos dados que serão exibidos no gráfico
    const data = {
        labels, // As horas (ex: ["15:00", "18:00", "21:00", ...])
        datasets: [
            {
                label: 'Temperatura', // Nome da linha no gráfico
                data: temperatures, // Valores de temperatura para cada hora
                fill: true, // Preenche a área sob a linha do gráfico
                borderColor: 'rgb(75, 192, 192)', // Cor da linha
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo preenchida sob a linha
                tension: 0.4, // Suaviza as curvas da linha (quanto menor, mais reta a linha)
            },
        ],
    };

    // Configuração adicional do gráfico, como responsividade e escalas
    const options = {
        responsive: true, // Faz o gráfico se ajustar ao tamanho da tela
        plugins: {
            legend: {
                position: 'top', // Posiciona a legenda no topo do gráfico
            },
        },
        scales: {
            y: {
                beginAtZero: false, // As escalas do eixo Y não começam do zero (para evitar distorções na visualização)
            },
        },
    };

    // Renderiza o gráfico de linha usando os dados e configurações definidos acima
    return <Line data={data} options={options} />;
};

// Exporta o componente WeatherChart para que possa ser usado em outros arquivos
export default WeatherChart;