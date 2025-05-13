import React from 'react';
import './DailyForecast.css';

function DailyForecast({ previsao }) {
  return (
    <div className="daily-forecast">
      {previsao.map((dia, index) => (
        <div key={index} className="forecast-card">
          <p className="forecast-date">{dia.data}</p>
          <img src={dia.icon} alt="Ícone do clima" className="forecast-icon" />
          <p>{dia.descricao}</p>
          <p><strong>{dia.temp}°C</strong></p>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;
