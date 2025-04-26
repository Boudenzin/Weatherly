// Importa a biblioteca React
import React from 'react';
// Importa o arquivo CSS para estilização do gráfico
import './WeatherChart.css';

// Importa o componente Line do pacote react-chartjs-2 para criação de gráficos de linha
import { Line } from 'react-chartjs-2';

// Importa os módulos necessários da biblioteca Chart.js
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registra os módulos importados no ChartJS (necessário para o gráfico funcionar)
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

/**
 * Componente WeatherChart
 * 
 * Exibe um gráfico de linha com a previsão de temperatura para os próximos intervalos de tempo.
 * 
 * @param {Object} dadosPrevisao - Objeto contendo a lista de previsões meteorológicas
 * @param {Array} dadosPrevisao.list - Lista de objetos de previsão para cada horário
 */
const WeatherChart = ({ dadosPrevisao }) => {
    // Se os dados ainda não foram carregados, exibe uma mensagem de carregamento
    if (!dadosPrevisao || !dadosPrevisao.list) {
        return <div>Carregando gráfico...</div>;
    }

    // Filtra os próximos 5 intervalos de tempo da previsão
    const intervals = dadosPrevisao.list.slice(0, 5);

    // Extrai apenas as horas dos dados de previsão
    const labels = intervals.map(item => {
        const horaCompleta = item.dt_txt.split(" ")[1]; // Exemplo: "15:00:00"
        return horaCompleta.substring(0, 5); // Retorna "15:00"
    });

    // Extrai as temperaturas correspondentes aos intervalos selecionados
    const temperatures = intervals.map(item => item.main.temp);

    // Configura os dados que serão exibidos no gráfico
    const data = {
        labels, // Horários no eixo X
        datasets: [
            {
                label: 'Temperatura', // Nome da linha do gráfico
                data: temperatures, // Valores de temperatura
                fill: true, // Preenche a área sob a linha
                borderColor: 'rgb(75, 192, 192)', // Cor da linha
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de preenchimento
                tension: 0.4, // Suaviza as curvas da linha
            },
        ],
    };

    // Configurações adicionais do gráfico
    const options = {
        responsive: true, // Torna o gráfico responsivo
        plugins: {
            legend: {
                position: 'top', // Posiciona a legenda no topo
            },
        },
        scales: {
            y: {
                beginAtZero: false, // Eixo Y começa no valor mínimo dos dados, não no zero
            },
        },
    };

    // Renderiza o gráfico de linha com os dados e opções definidas
    return <Line data={data} options={options} />;
};

// Exporta o componente para que possa ser usado em outros arquivos
export default WeatherChart;
