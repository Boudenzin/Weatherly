// Importa a biblioteca React, que é necessária para criar componentes React
import React from 'react'; 
// Importa o arquivo CSS específico para estilização do card
import './WeatherCard.css';

/**
 * Componente WeatherCard
 * 
 * Exibe informações climáticas atuais de uma cidade, incluindo:
 * nome da cidade, temperatura, descrição do clima, vento, umidade e ícone.
 * 
 * @param {string} cidade - Nome da cidade
 * @param {number} temperatura - Temperatura atual em graus Celsius
 * @param {string} descricao - Descrição do clima (ex: "Céu limpo")
 * @param {string} icon - Caminho para o ícone correspondente ao clima
 * @param {string} vento - Velocidade do vento (ex: "5 m/s")
 * @param {string} umidade - Umidade relativa do ar (ex: "80%")
 */
function WeatherCard({ cidade, temperatura, descricao, icon, vento, umidade }) {
  return (
    // Div principal do componente, que contém a estrutura do card
    <div className="weather-card">

      {/* Título do card, que exibe o nome da cidade */}
      <h2>{cidade}</h2>

      {/* Container com as informações principais do clima */}
      <div className="weather-info">
        {/* Ícone do clima (sol, chuva, nublado, etc.) */}
        <img src={icon} alt="Ícone do clima" className="weather-icon" />

        {/* Temperatura em destaque */}
        <p className="temperature">{temperatura}°C</p>

        {/* Informações adicionais como vento e umidade */}
        <div className="weather-extra">
          <p>Vento: {vento}</p>
          <p>Umidade: {umidade}</p>
        </div>
      </div>

      {/* Descrição textual do clima (ex: "Chuva leve") */}
      <p className="description">{descricao}</p>
    </div>
  );
}

// Exporta o componente para que possa ser usado em outros arquivos
export default WeatherCard;
