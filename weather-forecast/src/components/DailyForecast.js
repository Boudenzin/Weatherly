import React from 'react';
import './DailyForecast.css';

/**
 * Componente que exibe a previsão diária do tempo para os próximos dias.
 *
 * @param {Object} props - Propriedades recebidas pelo componente.
 * @param {Array} props.previsao - Lista de objetos representando a previsão do tempo diária.
 * Cada objeto deve conter:
 *  - data: string com o dia da semana (ex: "seg", "ter")
 *  - icon: URL do ícone representando a condição climática
 *  - descricao: descrição textual do clima (ex: "Céu limpo")
 *  - temp: temperatura prevista em graus Celsius
 *
 * @returns {JSX.Element} Um container com cartões de previsão do tempo.
 */
function DailyForecast({ previsao }) {
  return (
    <div className="daily-forecast">
      {previsao.map((dia, index) => (
        <div key={index} className="forecast-card">
          {/* Dia da semana */}
          <p className="forecast-date">{dia.data}</p>

          {/* Ícone de clima */}
          <img src={dia.icon} alt="Ícone do clima" className="forecast-icon" />

          {/* Descrição do clima */}
          <p className="forecast-description">{dia.descricao}</p>

          {/* Temperatura prevista */}
          <p className="forecast-temp">{dia.temp}°C</p>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;
