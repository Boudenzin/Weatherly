import React, {useState} from 'react';
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard';
import { getWeatherIcon } from './util/getWeatherIcon';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function capitalizarDescricao(description) {
  return description
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


function App() {


  const [dadosDoClima, setDadosDoClima] = useState(null);

  
  const handleCitySearch = async(city) => {
    try {
      console.log('Buscando a previsão do tempo para: ${city}');
      const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`); //Deixa em graus ceulsius e em br
      const dado = await response.json();

      if (dado.cod === 200) {

        const horaAtual = Date.now() / 1000; //Hora atual em segundos

        //Determina se é dia ou noite

        const ehDeDia = horaAtual >= dado.sys.sunrise && horaAtual < dado.sys.sunset;

        const weatherIcon = getWeatherIcon(dado.weather[0].description, ehDeDia);

        setDadosDoClima({
          cidade: dado.name,
          temperatura: Math.round(dado.main.temp),
          descricao: capitalizarDescricao(dado.weather[0].description),
          icon: weatherIcon,
          ehDeDia
        });
      
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
        
        />
        )}
      </div>
    </div>
  );
}

export default App;
