import React, {useState} from 'react';
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard';
import iconSun from './assets/3d-weather-icons/sun/26.png';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {


  const [dadosDoClima, setDadosDoClima] = useState(null);

  
  const handleCitySearch = async(city) => {
    try {
      console.log('Buscando a previsão do tempo para: ${city}');
      const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`); //Deixa em graus ceulsius e em br
      const dado = await response.json();

      if (dado.cod === 200) {
        setDadosDoClima({
          cidade: dado.name,
          temperatura: Math.round(dado.main.temp),
          descricao: dado.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${dado.weather[0].icon}@2x.png`
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
