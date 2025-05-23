// WeatherChart.js
import React from 'react';
import './WeatherChart.css'; // Estilos específicos para o gráfico

// Importação dos componentes principais da biblioteca Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

/**
 * Componente que exibe um gráfico de linha com a previsão de temperatura
 * para as próximas horas (15 horas em blocos de 3h) utilizando a biblioteca Recharts.
 *
 * @param {Object} props - Propriedades recebidas pelo componente.
 * @param {Object} props.dadosPrevisao - Objeto retornado pela API com os dados de previsão.
 * Espera-se que contenha uma propriedade `list`, que é um array de previsões horárias.
 *
 * Cada item da lista deve conter:
 *  - dt_txt: string com data e hora (ex: "2025-05-18 15:00:00")
 *  - main.temp: temperatura prevista
 *  - weather[0].description: descrição textual do clima
 *  - main.humidity: umidade relativa do ar
 *  - wind.speed: velocidade do vento
 *
 * @returns {JSX.Element} Gráfico de linha responsivo com a temperatura nas próximas horas.
 */
function WeatherChart({ dadosPrevisao }) {
  // Extraímos os próximos 5 blocos de 3h (total: 15 horas de previsão)
  const dados = dadosPrevisao.list.slice(0, 5).map(item => {
    const hora = new Date(item.dt_txt).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return {
      hora,
      temperatura: Math.round(item.main.temp),
      descricao: item.weather[0].description,
      umidade: item.main.humidity,
      vento: item.wind.speed
    };
  });

  return (
    <div className="weather-chart-container">
      {/* Container responsivo para se ajustar ao tamanho da tela */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={dados}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* Grelha de fundo do gráfico */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* Eixo X mostrando os horários */}
          <XAxis dataKey="hora" />

          {/* Eixo Y com temperatura (unidade °C) */}
          <YAxis unit="°C" />

          {/* Tooltip (dica de ferramenta) customizada ao passar o mouse */}
          <Tooltip
            formatter={(valor, nome) => {
              // Traduz e formata a temperatura no tooltip
              switch (nome) {
                case 'temperatura':
                  return [`${valor} °C`, 'Temperatura'];
                default:
                  return valor;
              }
            }}
            labelFormatter={(label, payload) => {
              // Mostra a descrição do clima junto do horário no tooltip
              if (payload && payload.length > 0) {
                const dadosTooltip = payload[0].payload;
                return `${label} - ${dadosTooltip.descricao.charAt(0).toUpperCase() + dadosTooltip.descricao.slice(1)}`;
              }
              return label;
            }}
            contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
          />

          {/* Linha de temperatura com estilo */}
          <Line
            type="monotone"
            dataKey="temperatura"
            stroke="#2f80ed"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherChart;
