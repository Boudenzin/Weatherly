import React from 'react';
import SearchBar from './components/SearchBar'
import './App.css';

function App() {
  
  const handleCitySearch = (city) => {
    console.log('Buscando a previsão do tempo para: ${city}');
    //Integração futura da API OpenWeather
  };




  return (
    <div className="App">
      <h1>Previsão do Tempo</h1>
      <p>Digite o nome de uma cidade para ver a previsão do tempo</p>
      <SearchBar onSearch={handleCitySearch}/>
      <div className="weather-cards">
        {/* Renderização de múltiplos WatherCard para cada previsão */}
        <WeatherCard />
      </div>
    </div>
  );
}

export default App;
