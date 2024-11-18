import React from 'react'; 
import './WeatherCard.css';

function WeatherCard({ cidade, temperatura, descricao, icon, vento, umidade }) {
  return (
    <div className="weather-card">
      <h2>{cidade}</h2>
      <div className="weather-info">
        <img src={icon} alt="Ícone do clima" className="weather-icon" />
        <p className="temperature">{temperatura}°C</p>
        <div className="weather-extra">
          <p>Vento: {vento}</p>
          <p>Umidade: {umidade}</p>
        </div>
      </div>
      <p className="description">{descricao}</p>
    </div>
  );
}

export default WeatherCard;
