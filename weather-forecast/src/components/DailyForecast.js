import React from 'react';
import './DailyForecast.css';

function DailyForecast({ previsao }) {
  return (
    <div className="daily-forecast">
      {previsao.map((dia, index) => (
        <div key={index} className="forecast-card">
          <p className="forecast-date">{dia.data}</p>
          <img src={dia.icon} alt="Ícone do clima" className="forecast-icon" />
          <p className="forecast-description">{dia.descricao}</p>
          <p className="forecast-temp">{dia.temp}°C</p>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;
