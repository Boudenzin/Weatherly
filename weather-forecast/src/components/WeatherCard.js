import React from 'react';


function WeatherCard({ cidade, temperatura, descricao, icon }) {
    return (
        <div class="weather-card">
            <h2>{cidade}</h2>
            <div className="weather-info">
                <img src={icon} alt={descricao} className="weather-icon" />
                <p>{tempreatura}°C</p>
            </div>
            <p>{descricao}</p>

        </div>
    );
}


export default WeatherCard;