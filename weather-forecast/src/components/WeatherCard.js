// Importa a biblioteca React, que é necessária para criar componentes React
import React from 'react'; 
// Importa o arquivo CSS WeatherCard.css
import './WeatherCard.css';

// Função que cria o componente WeatherCard
function WeatherCard({ cidade, temperatura, descricao, icon, vento, umidade }) {
  return (

    //Div principal do componente, que contém a estrutura do WeatherCard
    <div className="weather-card">

      {/* Título do card, que exibe o nome da cidade */}
      <h2>{cidade}</h2>
      <div className="weather-info">
        <img src={icon} alt="Ícone do clima" className="weather-icon" />
        <p className="temperature">{temperatura}°C</p>
        <div className="weather-extra">
          <p>Vento: {vento}</p>
          <p>Umidade: {umidade}</p>
        </div>
      </div>
      {/* Exibe a descrição do clima (ex: "Céu limpo", "Chuva leve") */}
      <p className="description">{descricao}</p>
    </div>
  );
}

export default WeatherCard;
