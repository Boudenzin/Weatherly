// WeatherChart.js
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function WeatherChart({ dadosPrevisao }) {
  // Pegamos os próximos 5 blocos de 3h (total: 15 horas)
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
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={dados}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis unit="°C" />
          <Tooltip
            formatter={(valor, nome) => {
              switch (nome) {
                case 'temperatura':
                  return [`${valor} °C`, 'Temperatura'];
                default:
                  return valor;
              }
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload.length > 0) {
                const dadosTooltip = payload[0].payload;
                return `${label} - ${dadosTooltip.descricao
                  .charAt(0)
                  .toUpperCase() + dadosTooltip.descricao.slice(1)}`;
              }
              return label;
            }}
            contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
          />
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
