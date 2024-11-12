import React from 'react';
import './WeatherCard.css';


function WeatherCard({ cidade, temperatura, descricao, icon }) {

    return (
        <div class="weather-card">
            <h2>{cidade}</h2>
            <div className="weather-info">
                <img src={icon} alt="Ícone do clima" className="weather-icon" />
                <p>{temperatura}°C</p>
            </div>
            <p>{descricao}</p>

        </div>
    );
}


export default WeatherCard;