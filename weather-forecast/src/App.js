import React, { useState } from 'react';
import { useEffect } from 'react';
import SearchBar from './components/SearchBar'; // Componente de busca de cidade
import WeatherCard from './components/WeatherCard'; // Componente que mostra o clima atual
import WeatherChart from './components/WeatherChart'; // Componente com o gráfico da previsão
import DailyForecast from './components/DailyForecast'; // Componente que mostra a previsão diária
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
  // Estado para guardar dados da previsão diária
  const [previsaoDiaria, setPrevisaoDiaria] = useState([]);

  const [temaEscuro, setTemaEscuro] = useState(false);
  // Função para alternar entre tema claro e escuro
  const alternarTema = () => {
  setTemaEscuro(prev => !prev);
  };

  
    /**
   * Função principal para buscar dados do clima atual e previsão futura.
   * Pode buscar com base em:
   *   - Nome da cidade (`cidade`)
   *   - Coordenadas geográficas (`lat` e `lon`)
   *
   * @param {Object} params - Parâmetros de busca
   * @param {string|null} params.cidade - Nome da cidade (opcional)
   * @param {number|null} params.lat - Latitude (opcional)
   * @param {number|null} params.lon - Longitude (opcional)
   */
  const buscarClima = async ({ cidade = null, lat = null, lon = null }) => {
    try {
      // Monta a query base para a API de acordo com cidade ou coordenadas
      const baseQuery = cidade
        ? `q=${cidade}`
        : `lat=${lat}&lon=${lon}`;

      // Requisição para dados do clima atual
      const weatherResponse = await fetch(`${BASE_URL}?${baseQuery}&appid=${API_KEY}&units=metric&lang=pt_br`);
      const dadoAtual = await weatherResponse.json();

      // Verifica se a resposta foi bem-sucedida
      if (dadoAtual.cod !== 200) {
        alert('Localização não encontrada.');
        return;
      }

      // Requisição para previsão do tempo (5 dias a cada 3h)
      const forecastResponse = await fetch(`${FORECAST_URL}?${baseQuery}&appid=${API_KEY}&units=metric&lang=pt_br`);
      const dadoFuturo = await forecastResponse.json();

      // Determina se é dia ou noite com base no horário atual e nos dados da API
      const horaAtual = Date.now() / 1000;
      const ehDeDia = horaAtual >= dadoAtual.sys.sunrise && horaAtual < dadoAtual.sys.sunset;

      // Busca o ícone de clima correspondente à descrição e período (dia/noite)
      const weatherIcon = getWeatherIcon(dadoAtual.weather[0].description, ehDeDia);

      // Atualiza o estado com os dados do clima atual
      setDadosDoClima({
        cidade: dadoAtual.name,
        temperatura: Math.round(dadoAtual.main.temp),
        descricao: capitalizarDescricao(dadoAtual.weather[0].description),
        vento: `${dadoAtual.wind.speed} m/s`,
        umidade: `${dadoAtual.main.humidity}%`,
        icon: weatherIcon,
        ehDeDia
      });

      // Atualiza o estado com todos os dados da previsão (bruto)
      setDadosPrevisao(dadoFuturo);

      // Filtra e formata a previsão diária para os próximos 5 dias (ao meio-dia)
      const diaria = dadoFuturo.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 5)
        .map(item => {
          const data = new Date(item.dt_txt);
          const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' });
          const descricao = capitalizarDescricao(item.weather[0].description);
          const icone = getWeatherIcon(item.weather[0].description, true);
          return {
            data: diaSemana,
            temp: Math.round(item.main.temp),
            descricao,
            icon: icone
          };
        });

      // Atualiza o estado com a previsão diária formatada
      setPrevisaoDiaria(diaria);

    } catch (error) {
      console.error('Erro ao buscar dados do clima:', error);
    }
  };

  /**
 * useEffect inicial: busca a localização do usuário ao carregar o app
 * Se a localização for obtida, busca o clima automaticamente com base nas coordenadas.
 */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          buscarClima({ lat: latitude, lon: longitude });
        },
        error => console.warn('Erro ao obter geolocalização:', error)
      );
    } else {
      console.warn('Geolocalização não suportada.');
    }
  }, []);


  // Função que busca os dados da cidade pesquisada (chamada ao clicar em "Buscar" ou pressionar Enter)
  const handleCitySearch = (city) => {
    buscarClima({ cidade: city });
  };


  return (
    <div className={`App ${temaEscuro ? 'tema-escuro' : 'tema-claro'}`}>

      {/* Logo no topo */}
            {/* Logo no topo */}
      <header className="app-header">
        <img src="/assets/logos/logo.png" alt="Logo do site" className="logo" />
        <h1>Previsão do Tempo</h1>
        <button className="botao-tema" onClick={alternarTema}>
          {temaEscuro ? '☀️ Tema Claro' : '🌙 Tema Escuro'}
        </button>
      </header>

      {/* Texto de instrução */}
      <p>Digite o nome de uma cidade para ver a previsão do tempo</p>

      {/* Componente de busca */}
      <SearchBar onSearch={handleCitySearch} />

      <div className="weather-container">
        <div className="left-column">
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

          {previsaoDiaria.length > 0 && <DailyForecast previsao={previsaoDiaria} />}
        </div>
        <div className="right-column">
          {/* Se já houver dados de previsão, exibe o gráfico */}
          {dadosPrevisao && <WeatherChart dadosPrevisao={dadosPrevisao} />} 
        </div>
      </div>
    </div>
  );
}

export default App;