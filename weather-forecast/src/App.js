import React, { useState } from 'react';
import SearchBar from './components/SearchBar'; // Componente de busca de cidade
import WeatherCard from './components/WeatherCard'; // Componente que mostra o clima atual
import WeatherChart from './components/WeatherChart'; // Componente com o gráfico da previsão
import { getWeatherIcon } from './util/getWeatherIcon'; // Função utilitária que seleciona o ícone do clima
import './App.css'; // Estilo geral da aplicação

// Constantes com URLs das APIs da OpenWeatherMap
const API_KEY = process.env.REACT_APP_API_KEY; // Chave da API (vinda de .env)
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'; // URL para clima atual
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'; // URL para previsão

// Função auxiliar que capitaliza as palavras da descrição do tempo
function capitalizarDescricao(description) {
  return description
    .toLowerCase() // converte tudo para minúsculo
    .split(" ") // divide a string em palavras
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitaliza a primeira letra de cada palavra
    .join(" "); // junta tudo novamente com espaço
}

function App() {
  // Estado para guardar dados do clima atual
  const [dadosDoClima, setDadosDoClima] = useState(null);
  // Estado para guardar dados da previsão futura
  const [dadosPrevisao, setDadosPrevisao] = useState(null);

  // Função que busca os dados da cidade pesquisada (chamada ao clicar em "Buscar" ou pressionar Enter)
  const handleCitySearch = async (city) => {
    try {
      console.log('Buscando a previsão do tempo para: ${city}');
      
      // Faz requisição para clima atual
      const weatherResponse = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
      const dadoAtual = await weatherResponse.json();

      // Verifica se a cidade foi encontrada (código 200)
      if (dadoAtual.cod === 200) {
        // Faz requisição para previsão
        const forecastResponse = await fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
        const dadoFuturo = await forecastResponse.json();

        // Hora atual em segundos
        const horaAtual = Date.now() / 1000;

        // Verifica se é dia (com base no nascer/pôr do sol)
        const ehDeDia = horaAtual >= dadoAtual.sys.sunrise && horaAtual < dadoAtual.sys.sunset;

        // Pega o ícone correspondente ao tempo
        const weatherIcon = getWeatherIcon(dadoAtual.weather[0].description, ehDeDia);

        // Atualiza o estado com os dados formatados do clima atual
        setDadosDoClima({
          cidade: dadoAtual.name,
          temperatura: Math.round(dadoAtual.main.temp),
          descricao: capitalizarDescricao(dadoAtual.weather[0].description),
          vento: `${dadoAtual.wind.speed} m/s`,
          umidade: `${dadoAtual.main.humidity}%`,
          icon: weatherIcon,
          ehDeDia
        });

        // Atualiza estado com dados da previsão futura
        setDadosPrevisao(dadoFuturo);
      } else {
        alert('Cidade não encontrada');
      }

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <div className="App">
      <h1>Previsão do Tempo</h1>
      <p>Digite o nome de uma cidade para ver a previsão do tempo</p>

      {/* Componente de busca */}
      <SearchBar onSearch={handleCitySearch} />

      <div className="weather-cards">
        {/* Se já houver dados do clima, exibe o WeatherCard */}
        {dadosDoClima && (
          <WeatherCard 
            cidade={dadosDoClima.cidade}
            temperatura={dadosDoClima.temperatura}
            descricao={dadosDoClima.descricao}
            icon={dadosDoClima.icon}
            vento={dadosDoClima.vento}
            umidade={dadosDoClima.umidade}
          />
        )}

        {/* Se já houver dados de previsão, exibe o gráfico */}
        {dadosPrevisao && (
          <div className="weather-chart-container">
            <WeatherChart dadosPrevisao={dadosPrevisao} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;