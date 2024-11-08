import React, {useState} from 'react';
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard';
import iconSun from './assets/3d-weather-icons/sun/26.png';
import './App.css';

const API_KEY = 'c115fe8faf37c1763e9a1814c362cea1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {


  const [dadosDoClima, setDadosDoClima] = useState(null);

  
  const handleCitySearch = (city) => {
    console.log('Buscando a previsão do tempo para: ${city}');
    //Integração futura da API OpenWeather
  };

  const mockWeatherData = {
    cidade: "São Paulo",
    temperatura: 25,
    descricao: "Ensolarado",
    icon: iconSun

  };




  return (
    <div className="App">
      <h1>Previsão do Tempo</h1>
      <p>Digite o nome de uma cidade para ver a previsão do tempo</p>
      <SearchBar onSearch={handleCitySearch}/>
      <div className="weather-cards">
        {/* Renderização de múltiplos WatherCard para cada previsão */}
        <WeatherCard 
          cidade={mockWeatherData.cidade}
          temperatura={mockWeatherData.temperatura}
          descricao={mockWeatherData.descricao}
          icon={mockWeatherData.icon}
        
        />
      </div>
    </div>
  );
}

export default App;
