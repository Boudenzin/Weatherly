import React, {useState} from 'react';
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard';
import { getWeatherIcon } from './util/getWeatherIcon';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

function capitalizarDescricao(description) {
  return description
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


function App() {


  const [dadosDoClima, setDadosDoClima] = useState(null);
  const [dadosPrevisao, setDadosPrevisao] = useState(null);

  
  const handleCitySearch = async(city) => {
    try {
      console.log('Buscando a previsão do tempo para: ${city}');
      const weatherResponse = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`); //Deixa em graus ceulsius e em br
      const dadoAtual = await weatherResponse.json();

      if (dadoAtual.cod === 200) {

        const horaAtual = Date.now() / 1000; //Hora atual em segundos

        //Determina se é dia ou noite

        const ehDeDia = horaAtual >= dadoAtual.sys.sunrise && horaAtual < dadoAtual.sys.sunset;

        const weatherIcon = getWeatherIcon(dadoAtual.weather[0].description, ehDeDia);

        setDadosDoClima({
          cidade: dadoAtual.name,
          temperatura: Math.round(dadoAtual.main.temp),
          descricao: capitalizarDescricao(dadoAtual.weather[0].description),
          vento: `${dadoAtual.wind.speed} m/s`,
          umidade: `${dadoAtual.main.humidity}%`,
          icon: weatherIcon,
          ehDeDia
        });

        //Fetch para prever os proximos horarios
        const forecastResponse = await fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
        const dadoFuturo = await forecastResponse.json();
        setDadosPrevisao(dadoFuturo);
    } else {
      alert('Cidade não encontrada');
    }
   
  } catch (error){
    console.error("Erro ao buscar dados:", error);
  }
};

  //const mockWeatherData = {
    //cidade: "São Paulo",
    //temperatura: 25,
    //descricao: "Ensolarado",
    //icon: iconSun

  //};




  return (
    <div className="App">
      <h1>Previsão do Tempo</h1>
      <p>Digite o nome de uma cidade para ver a previsão do tempo</p>
      <SearchBar onSearch={handleCitySearch}/>
      <div className="weather-cards">
        {/* Renderização de múltiplos WatherCard para cada previsão */}
        {dadosDoClima && (<WeatherCard 
          cidade={dadosDoClima.cidade}
          temperatura={dadosDoClima.temperatura}
          descricao={dadosDoClima.descricao}
          icon={dadosDoClima.icon}
          vento={dadosDoClima.vento}
          umidade={dadosDoClima.umidade}
        
        />
        )}
      </div>
      {/* Rendereização do gráfico de previsão */}
      {dadosPrevisao && <WeatherChart forecastData={dadosPrevisao} />}
    </div>
  );
}

export default App;
